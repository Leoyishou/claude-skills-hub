import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

// Fallback static data for when database is not available
import { skills as staticSkills, categories as staticCategories } from "@/lib/skills-data";

export interface DbSkill {
  id: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string | null;
  descriptionZh: string | null;
  scenarioEn: string | null;
  scenarioZh: string | null;
  category: string;
  tagsEn: string[] | null;
  tagsZh: string[] | null;
  source: "official" | "community";
  author: string | null;
  url: string | null;
  isActive: boolean;
  sortOrder: number | null;
}

export interface DbCategory {
  id: string;
  nameEn: string;
  nameZh: string;
  descEn: string | null;
  descZh: string | null;
  color: string | null;
  icon: string | null;
  sortOrder: number | null;
}

// Transform database skill to frontend format
function transformDbSkill(dbSkill: DbSkill) {
  return {
    id: dbSkill.id,
    name: dbSkill.titleEn,
    description: {
      en: dbSkill.descriptionEn || "",
      zh: dbSkill.descriptionZh || "",
    },
    scenario: {
      en: dbSkill.scenarioEn || "",
      zh: dbSkill.scenarioZh || "",
    },
    tags: {
      en: dbSkill.tagsEn || [],
      zh: dbSkill.tagsZh || [],
    },
    category: dbSkill.category,
    isOfficial: dbSkill.source === "official",
    isCommunity: dbSkill.source === "community",
    author: dbSkill.author || undefined,
    url: dbSkill.url || undefined,
  };
}

// Transform database category to frontend format
function transformDbCategory(dbCategory: DbCategory) {
  return {
    id: dbCategory.id,
    name: `category.${dbCategory.id}`,
    nameEn: dbCategory.nameEn,
    nameZh: dbCategory.nameZh,
    icon: dbCategory.icon || "/images/hero-banner.png",
    color: dbCategory.color || "var(--primary)",
  };
}

export function useSkillsData() {
  const skillsQuery = trpc.skills.list.useQuery(undefined, {
    retry: 1,
  });

  const categoriesQuery = trpc.categories.list.useQuery(undefined, {
    retry: 1,
  });

  const useStaticFallback = skillsQuery.isError || categoriesQuery.isError || 
    (!skillsQuery.isLoading && (!skillsQuery.data || skillsQuery.data.length === 0));

  const skills = useMemo(() => {
    if (useStaticFallback || !skillsQuery.data || skillsQuery.data.length === 0) {
      return staticSkills;
    }
    return skillsQuery.data.map(transformDbSkill);
  }, [skillsQuery.data, useStaticFallback]);

  const categories = useMemo(() => {
    if (useStaticFallback || !categoriesQuery.data || categoriesQuery.data.length === 0) {
      return staticCategories;
    }
    return categoriesQuery.data.map(transformDbCategory);
  }, [categoriesQuery.data, useStaticFallback]);

  return {
    skills,
    categories,
    isLoading: skillsQuery.isLoading || categoriesQuery.isLoading,
    isError: skillsQuery.isError && categoriesQuery.isError,
    isFromDatabase: !useStaticFallback && skillsQuery.data && skillsQuery.data.length > 0,
  };
}

export function useSeedDatabase() {
  const seedMutation = trpc.skills.bulkSeed.useMutation();

  const seedFromScript = async () => {
    // Import seed data
    const categoriesData = [
      {
        id: "marketing",
        nameEn: "Marketing & Brand",
        nameZh: "市场与品牌",
        descEn: "Skills for brand strategy, market intelligence, and marketing operations.",
        descZh: "品牌策略、市场情报和营销运营相关技能。",
        color: "#FF4500",
        icon: "/images/category-marketing.png",
        sortOrder: 1,
      },
      {
        id: "writing",
        nameEn: "Writing & Editing",
        nameZh: "写作与编辑",
        descEn: "Skills for content creation, technical writing, and format conversion.",
        descZh: "内容创作、技术写作和格式转换相关技能。",
        color: "#1E90FF",
        icon: "/images/category-writing.png",
        sortOrder: 2,
      },
      {
        id: "design",
        nameEn: "Design & Media",
        nameZh: "设计与多媒体",
        descEn: "Skills for UI engineering, visual assets, and media tools.",
        descZh: "界面工程、视觉资产和媒体工具相关技能。",
        color: "#9932CC",
        icon: "/images/category-design.png",
        sortOrder: 3,
      },
      {
        id: "coding",
        nameEn: "Coding & Engineering",
        nameZh: "编程与工程",
        descEn: "Skills for development workflow, cloud/DevOps, and security testing.",
        descZh: "开发流程、云原生和安全测试相关技能。",
        color: "#228B22",
        icon: "/images/category-coding.png",
        sortOrder: 4,
      },
      {
        id: "research",
        nameEn: "Research & Analysis",
        nameZh: "研究与分析",
        descEn: "Skills for data extraction, deep analysis, and domain-specific research.",
        descZh: "数据提取、深度分析和领域专用研究相关技能。",
        color: "#FF8C00",
        icon: "/images/hero-banner.png",
        sortOrder: 5,
      },
      {
        id: "productivity",
        nameEn: "Productivity & Tools",
        nameZh: "生产力与工具",
        descEn: "Skills for office suite, thinking and planning.",
        descZh: "办公套件、思维与规划相关技能。",
        color: "#708090",
        icon: "/images/hero-banner.png",
        sortOrder: 6,
      },
    ];

    // Transform static skills to database format
    const skillsData = staticSkills.map((skill, index) => ({
      id: skill.id,
      titleEn: skill.name,
      titleZh: skill.name, // Will be updated with proper Chinese title
      descriptionEn: skill.description.en,
      descriptionZh: skill.description.zh,
      scenarioEn: skill.scenario.en,
      scenarioZh: skill.scenario.zh,
      category: skill.category,
      tagsEn: skill.tags.en,
      tagsZh: skill.tags.zh,
      source: skill.isOfficial ? "official" as const : "community" as const,
      author: skill.author,
      url: skill.url,
      sortOrder: index + 1,
    }));

    return seedMutation.mutateAsync({ categories: categoriesData, skills: skillsData });
  };

  return {
    seedFromScript,
    isLoading: seedMutation.isPending,
    isSuccess: seedMutation.isSuccess,
    error: seedMutation.error,
  };
}
