import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the database functions
vi.mock('./db', () => ({
  getAllCategories: vi.fn(),
  getAllSkills: vi.fn(),
  getSkillsByCategory: vi.fn(),
  getSkillById: vi.fn(),
  bulkUpsertCategories: vi.fn(),
  bulkUpsertSkills: vi.fn(),
  upsertSkill: vi.fn(),
  deleteSkill: vi.fn(),
}));

import * as db from './db';

describe('Skills API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllCategories', () => {
    it('should return empty array when no categories exist', async () => {
      vi.mocked(db.getAllCategories).mockResolvedValue([]);
      const result = await db.getAllCategories();
      expect(result).toEqual([]);
    });

    it('should return categories when they exist', async () => {
      const mockCategories = [
        {
          id: 'marketing',
          nameEn: 'Marketing & Brand',
          nameZh: '市场与品牌',
          descEn: 'Marketing skills',
          descZh: '市场技能',
          color: '#FF4500',
          icon: '/images/category-marketing.png',
          sortOrder: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      vi.mocked(db.getAllCategories).mockResolvedValue(mockCategories);
      const result = await db.getAllCategories();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('marketing');
      expect(result[0].nameEn).toBe('Marketing & Brand');
    });
  });

  describe('getAllSkills', () => {
    it('should return empty array when no skills exist', async () => {
      vi.mocked(db.getAllSkills).mockResolvedValue([]);
      const result = await db.getAllSkills();
      expect(result).toEqual([]);
    });

    it('should return skills when they exist', async () => {
      const mockSkills = [
        {
          id: 'brand-guidelines',
          titleEn: 'Brand Guidelines',
          titleZh: '品牌指南',
          descriptionEn: 'Enforce brand guidelines',
          descriptionZh: '强制品牌指南',
          scenarioEn: 'Generating PRD documents',
          scenarioZh: '生成 PRD 文档',
          category: 'marketing',
          tagsEn: ['Brand & Strategy'],
          tagsZh: ['品牌策略'],
          source: 'official' as const,
          author: null,
          url: 'https://github.com/anthropics/skills',
          isActive: true,
          sortOrder: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      vi.mocked(db.getAllSkills).mockResolvedValue(mockSkills);
      const result = await db.getAllSkills();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('brand-guidelines');
      expect(result[0].source).toBe('official');
    });
  });

  describe('getSkillsByCategory', () => {
    it('should return skills filtered by category', async () => {
      const mockSkills = [
        {
          id: 'brand-guidelines',
          titleEn: 'Brand Guidelines',
          titleZh: '品牌指南',
          descriptionEn: 'Enforce brand guidelines',
          descriptionZh: '强制品牌指南',
          scenarioEn: 'Generating PRD documents',
          scenarioZh: '生成 PRD 文档',
          category: 'marketing',
          tagsEn: ['Brand & Strategy'],
          tagsZh: ['品牌策略'],
          source: 'official' as const,
          author: null,
          url: 'https://github.com/anthropics/skills',
          isActive: true,
          sortOrder: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      vi.mocked(db.getSkillsByCategory).mockResolvedValue(mockSkills);
      const result = await db.getSkillsByCategory('marketing');
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('marketing');
    });

    it('should return empty array for non-existent category', async () => {
      vi.mocked(db.getSkillsByCategory).mockResolvedValue([]);
      const result = await db.getSkillsByCategory('non-existent');
      expect(result).toEqual([]);
    });
  });

  describe('getSkillById', () => {
    it('should return skill when found', async () => {
      const mockSkill = {
        id: 'brand-guidelines',
        titleEn: 'Brand Guidelines',
        titleZh: '品牌指南',
        descriptionEn: 'Enforce brand guidelines',
        descriptionZh: '强制品牌指南',
        scenarioEn: 'Generating PRD documents',
        scenarioZh: '生成 PRD 文档',
        category: 'marketing',
        tagsEn: ['Brand & Strategy'],
        tagsZh: ['品牌策略'],
        source: 'official' as const,
        author: null,
        url: 'https://github.com/anthropics/skills',
        isActive: true,
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      vi.mocked(db.getSkillById).mockResolvedValue(mockSkill);
      const result = await db.getSkillById('brand-guidelines');
      expect(result).toBeDefined();
      expect(result?.id).toBe('brand-guidelines');
    });

    it('should return undefined when skill not found', async () => {
      vi.mocked(db.getSkillById).mockResolvedValue(undefined);
      const result = await db.getSkillById('non-existent');
      expect(result).toBeUndefined();
    });
  });

  describe('bulkUpsertCategories', () => {
    it('should call bulkUpsertCategories with correct data', async () => {
      const categoriesData = [
        {
          id: 'marketing',
          nameEn: 'Marketing & Brand',
          nameZh: '市场与品牌',
        },
      ];
      vi.mocked(db.bulkUpsertCategories).mockResolvedValue(undefined);
      await db.bulkUpsertCategories(categoriesData);
      expect(db.bulkUpsertCategories).toHaveBeenCalledWith(categoriesData);
    });
  });

  describe('bulkUpsertSkills', () => {
    it('should call bulkUpsertSkills with correct data', async () => {
      const skillsData = [
        {
          id: 'brand-guidelines',
          titleEn: 'Brand Guidelines',
          titleZh: '品牌指南',
          category: 'marketing',
        },
      ];
      vi.mocked(db.bulkUpsertSkills).mockResolvedValue(undefined);
      await db.bulkUpsertSkills(skillsData);
      expect(db.bulkUpsertSkills).toHaveBeenCalledWith(skillsData);
    });
  });
});
