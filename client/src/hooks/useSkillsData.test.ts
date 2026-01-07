import { describe, it, expect } from 'vitest';

// Test the search filtering logic
describe('Skills Search Filtering', () => {
  const mockSkills = [
    {
      id: 'brand-guidelines',
      name: 'Brand Guidelines',
      description: {
        en: 'Enforce brand guidelines when generating content.',
        zh: '强制 Claude 在生成内容时遵循预设的企业配色、字体和 Tone of Voice。',
      },
      scenario: {
        en: 'Generating PRD documents that comply with CI standards.',
        zh: '生成符合 CI 标准的 PRD 文档或对外宣传稿。',
      },
      tags: {
        en: ['Brand & Strategy'],
        zh: ['品牌策略'],
      },
      category: 'marketing',
      isOfficial: true,
      isCommunity: false,
      author: undefined,
      url: 'https://github.com/anthropics/skills',
    },
    {
      id: 'python-debugger',
      name: 'Python Debugger',
      description: {
        en: 'Advanced Python debugging assistant.',
        zh: '高级 Python 调试助手。',
      },
      scenario: {
        en: 'Debugging complex Python applications.',
        zh: '调试复杂的 Python 应用程序。',
      },
      tags: {
        en: ['Development', 'Python'],
        zh: ['开发', 'Python'],
      },
      category: 'coding',
      isOfficial: false,
      isCommunity: true,
      author: 'testuser',
      url: 'https://github.com/testuser/python-debugger',
    },
  ];

  // Helper function to filter skills (mirrors the logic in Home.tsx)
  const filterSkills = (skills: typeof mockSkills, query: string, category: string = 'all') => {
    let result = skills;
    
    if (category !== 'all') {
      result = result.filter(skill => skill.category === category);
    }
    
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(skill => {
        const nameMatch = skill.name.toLowerCase().includes(q);
        const descEnMatch = skill.description.en.toLowerCase().includes(q);
        const descZhMatch = skill.description.zh.toLowerCase().includes(q);
        const scenarioEnMatch = skill.scenario.en.toLowerCase().includes(q);
        const scenarioZhMatch = skill.scenario.zh.toLowerCase().includes(q);
        const tagsEnMatch = skill.tags.en.some(tag => tag.toLowerCase().includes(q));
        const tagsZhMatch = skill.tags.zh.some(tag => tag.toLowerCase().includes(q));
        const authorMatch = skill.author?.toLowerCase().includes(q) || false;
        
        return nameMatch || descEnMatch || descZhMatch || scenarioEnMatch || scenarioZhMatch || tagsEnMatch || tagsZhMatch || authorMatch;
      });
    }
    
    return result;
  };

  describe('Search by name', () => {
    it('should find skills by English name', () => {
      const result = filterSkills(mockSkills, 'brand');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('brand-guidelines');
    });

    it('should find skills by partial name match', () => {
      const result = filterSkills(mockSkills, 'python');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('python-debugger');
    });

    it('should be case insensitive', () => {
      const result = filterSkills(mockSkills, 'BRAND');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('brand-guidelines');
    });
  });

  describe('Search by description', () => {
    it('should find skills by English description', () => {
      const result = filterSkills(mockSkills, 'debugging');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('python-debugger');
    });

    it('should find skills by Chinese description', () => {
      const result = filterSkills(mockSkills, '企业配色');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('brand-guidelines');
    });
  });

  describe('Search by tags', () => {
    it('should find skills by English tags', () => {
      const result = filterSkills(mockSkills, 'development');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('python-debugger');
    });

    it('should find skills by Chinese tags', () => {
      const result = filterSkills(mockSkills, '品牌策略');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('brand-guidelines');
    });
  });

  describe('Search by author', () => {
    it('should find skills by author name', () => {
      const result = filterSkills(mockSkills, 'testuser');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('python-debugger');
    });
  });

  describe('Category filtering', () => {
    it('should filter by category', () => {
      const result = filterSkills(mockSkills, '', 'marketing');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('brand-guidelines');
    });

    it('should combine category and search filters', () => {
      const result = filterSkills(mockSkills, 'brand', 'marketing');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('brand-guidelines');
    });

    it('should return empty when category and search do not match', () => {
      const result = filterSkills(mockSkills, 'python', 'marketing');
      expect(result).toHaveLength(0);
    });
  });

  describe('Edge cases', () => {
    it('should return all skills when search is empty', () => {
      const result = filterSkills(mockSkills, '');
      expect(result).toHaveLength(2);
    });

    it('should return all skills when search is whitespace only', () => {
      const result = filterSkills(mockSkills, '   ');
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no match found', () => {
      const result = filterSkills(mockSkills, 'nonexistent');
      expect(result).toHaveLength(0);
    });
  });
});
