import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    "hero.tagline": "OPEN SOURCE SKILLS LIBRARY",
    "hero.title.prefix": "CLAUDE",
    "hero.title.suffix": "SKILLS",
    "hero.title.hub": "HUB",
    "hero.description": "A curated collection of capabilities to supercharge your AI workflow. Categorized for PMs, Developers, and Creators.",
    "hero.button.explore": "Explore Skills",
    "hero.button.contribute": "Contribute",
    "filter.all": "ALL SKILLS",
    "footer.rights": "© 2026 Manus AI. All rights reserved.",
    "footer.curated": "Curated for PMs & Developers.",
    "empty.message": "No skills found in this category.",
    "card.official": "Official",
    "card.community": "Community",
    "card.scenario": "Scenario:",
    "card.by": "By",
    "card.recommended": "★ Highly Recommended",
    
    // Categories
    "category.marketing": "Marketing Skills",
    "category.marketing.desc": "Ensure brand consistency, automate competitive analysis & traffic acquisition.",
    "category.writing": "Writing Skills",
    "category.writing.desc": "From simple text generation to structured, well-cited deep creation.",
    "category.design": "Design Skills",
    "category.design.desc": "Bridge the gap between text instructions and visual output.",
    "category.coding": "Coding Skills",
    "category.coding.desc": "Turn Claude into a full-stack engineer with file ops, testing & cloud capabilities.",
    "category.research": "Research Skills",
    "category.research.desc": "Automate information retrieval & correlation analysis for RAG & knowledge management.",
    "category.productivity": "Productivity Skills",
    "category.productivity.desc": "Handle binary office files & assist in thinking/decision making.",
  },
  zh: {
    "hero.tagline": "开源技能库",
    "hero.title.prefix": "CLAUDE",
    "hero.title.suffix": "技能",
    "hero.title.hub": "中心",
    "hero.description": "精心策划的技能集合，旨在增强您的 AI 工作流程。专为产品经理、开发者和创作者分类。",
    "hero.button.explore": "探索技能",
    "hero.button.contribute": "贡献技能",
    "filter.all": "所有技能",
    "footer.rights": "© 2026 Manus AI. 保留所有权利。",
    "footer.curated": "专为 PM 和开发者策划。",
    "empty.message": "在此分类中未找到技能。",
    "card.official": "官方",
    "card.community": "社区",
    "card.scenario": "场景：",
    "card.by": "作者：",
    "card.recommended": "★ 强烈推荐",

    // Categories
    "category.marketing": "市场与品牌",
    "category.marketing.desc": "确保品牌一致性，自动化竞品分析与流量获取。",
    "category.writing": "写作与编辑",
    "category.writing.desc": "从简单的文本生成转向结构化、引用严谨的深度创作。",
    "category.design": "设计与多媒体",
    "category.design.desc": "弥合文本指令与视觉产出之间的鸿沟。",
    "category.coding": "编程与工程",
    "category.coding.desc": "将 Claude 转化为具备文件操作、测试和云能力的“全栈工程师”。",
    "category.research": "研究与分析",
    "category.research.desc": "自动化信息获取与关联分析，辅助 RAG 和知识管理。",
    "category.productivity": "生产力与办公",
    "category.productivity.desc": "处理二进制办公文件，辅助思维决策。",
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese as requested context implies Chinese user

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
