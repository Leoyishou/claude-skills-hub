import { eq, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, categories, skills, InsertCategory, InsertSkill, Category, Skill } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==================== Categories ====================

export async function getAllCategories(): Promise<Category[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get categories: database not available");
    return [];
  }

  return await db.select().from(categories).orderBy(asc(categories.sortOrder));
}

export async function upsertCategory(category: InsertCategory): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert category: database not available");
    return;
  }

  await db.insert(categories).values(category).onDuplicateKeyUpdate({
    set: {
      nameEn: category.nameEn,
      nameZh: category.nameZh,
      descEn: category.descEn,
      descZh: category.descZh,
      color: category.color,
      icon: category.icon,
      sortOrder: category.sortOrder,
    },
  });
}

export async function bulkUpsertCategories(items: InsertCategory[]): Promise<void> {
  for (const item of items) {
    await upsertCategory(item);
  }
}

// ==================== Skills ====================

export async function getAllSkills(): Promise<Skill[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get skills: database not available");
    return [];
  }

  return await db.select().from(skills).where(eq(skills.isActive, true)).orderBy(asc(skills.sortOrder));
}

export async function getSkillsByCategory(categoryId: string): Promise<Skill[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get skills: database not available");
    return [];
  }

  return await db.select().from(skills)
    .where(eq(skills.category, categoryId))
    .orderBy(asc(skills.sortOrder));
}

export async function getSkillById(id: string): Promise<Skill | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get skill: database not available");
    return undefined;
  }

  const result = await db.select().from(skills).where(eq(skills.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertSkill(skill: InsertSkill): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert skill: database not available");
    return;
  }

  await db.insert(skills).values(skill).onDuplicateKeyUpdate({
    set: {
      titleEn: skill.titleEn,
      titleZh: skill.titleZh,
      descriptionEn: skill.descriptionEn,
      descriptionZh: skill.descriptionZh,
      scenarioEn: skill.scenarioEn,
      scenarioZh: skill.scenarioZh,
      category: skill.category,
      tagsEn: skill.tagsEn,
      tagsZh: skill.tagsZh,
      source: skill.source,
      author: skill.author,
      url: skill.url,
      isActive: skill.isActive,
      sortOrder: skill.sortOrder,
    },
  });
}

export async function bulkUpsertSkills(items: InsertSkill[]): Promise<void> {
  for (const item of items) {
    await upsertSkill(item);
  }
}

export async function deleteSkill(id: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete skill: database not available");
    return;
  }

  await db.delete(skills).where(eq(skills.id, id));
}
