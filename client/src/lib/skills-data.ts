export interface Skill {
  id: string;
  name: string;
  description: {
    en: string;
    zh: string;
  };
  scenario: {
    en: string;
    zh: string;
  };
  tags: {
    en: string[];
    zh: string[];
  };
  category: string;
  isOfficial?: boolean;
  isCommunity?: boolean;
  isHighlight?: boolean;
  author?: string;
  url?: string;
}

export interface Category {
  id: string;
  name: string; // Key for translation
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "marketing",
    name: "category.marketing",
    icon: "/images/category-marketing.png",
    color: "var(--primary)",
  },
  {
    id: "writing",
    name: "category.writing",
    icon: "/images/category-writing.png",
    color: "var(--secondary)",
  },
  {
    id: "design",
    name: "category.design",
    icon: "/images/category-design.png",
    color: "var(--accent)",
  },
  {
    id: "coding",
    name: "category.coding",
    icon: "/images/category-coding.png",
    color: "var(--chart-4)",
  },
  {
    id: "research",
    name: "category.research",
    icon: "/images/hero-banner.png",
    color: "var(--chart-5)",
  },
  {
    id: "productivity",
    name: "category.productivity",
    icon: "/images/hero-banner.png",
    color: "var(--muted-foreground)",
  },
];

export const skills: Skill[] = [
  // 1. Marketing
  {
    id: "brand-guidelines",
    name: "Brand Guidelines",
    category: "marketing",
    description: {
      en: "Enforce Claude to follow preset corporate colors, fonts, and Tone of Voice.",
      zh: "强制 Claude 在生成内容时遵循预设的企业配色、字体和 Tone of Voice。"
    },
    scenario: {
      en: "Generating PRD documents or press releases that meet CI standards.",
      zh: "生成符合 CI 标准的 PRD 文档或对外宣传稿。"
    },
    tags: {
      en: ["Brand & Strategy"],
      zh: ["品牌策略"]
    },
    isOfficial: true,
    url: "https://github.com/anthropics/skills/tree/main/skills/brand-guidelines"
  },
  {
    id: "brand-voice-analyzer",
    name: "Brand Voice Analyzer",
    category: "marketing",
    description: {
      en: "Use Python scripts to quantify text tone, formality, and perspective.",
      zh: "使用 Python 脚本量化分析文本的语气、正式度和视角，确保“不讲 AI 味的废话”。"
    },
    scenario: {
      en: "Auditing outsourced copy or AI-generated drafts.",
      zh: "审核外包文案或 AI 生成的初稿。"
    },
    tags: {
      en: ["Brand & Strategy"],
      zh: ["品牌策略"]
    },
    isCommunity: true,
    author: "alirezarezvani",
    url: "https://github.com/alirezarezvani/claude-skills"
  },
  {
    id: "domain-name-brainstormer",
    name: "Domain Name Brainstormer",
    category: "marketing",
    description: {
      en: "Generate creative domain names and check availability for .com/.io/.ai.",
      zh: "生成创意域名并检查 .com/.io/.ai 等后缀的可用性。"
    },
    scenario: {
      en: "Naming new products or side projects.",
      zh: "新产品/Side Project 命名构思。"
    },
    tags: {
      en: ["Brand & Strategy"],
      zh: ["品牌策略"]
    },
  },
  {
    id: "competitive-ads-extractor",
    name: "Competitive Ads Extractor",
    category: "marketing",
    description: {
      en: "Scrape competitor copy from ad libraries, analyze hooks and value propositions.",
      zh: "从广告库抓取竞品文案、分析心理诱导点（Hooks）和价值主张。"
    },
    scenario: {
      en: "Competitor analysis reports, finding differentiated selling points.",
      zh: "竞品分析报告，寻找差异化卖点。"
    },
    tags: {
      en: ["Market Intelligence"],
      zh: ["市场情报"]
    },
  },
  {
    id: "lead-research-assistant",
    name: "Lead Research Assistant",
    category: "marketing",
    description: {
      en: "Analyze product features, automate B2B lead search and generate outreach strategies.",
      zh: "分析产品特性，自动化搜索潜在 B2B 客户并生成 Outreach 策略。"
    },
    scenario: {
      en: "Finding seed users during cold start.",
      zh: "冷启动阶段寻找种子用户。"
    },
    tags: {
      en: ["Market Intelligence"],
      zh: ["市场情报"]
    },
  },
  {
    id: "content-calendar-manager",
    name: "Content Calendar Manager",
    category: "marketing",
    description: {
      en: "Build content clusters and reuse chains (e.g., Blog -> Tweet), generate Notion/CSV calendars.",
      zh: "构建内容集群和复用链条（如 Blog -> Tweet），生成 Notion/CSV 格式日历。"
    },
    scenario: {
      en: "Content marketing scheduling.",
      zh: "内容营销排期。"
    },
    tags: {
      en: ["Operations"],
      zh: ["营销运营"]
    },
  },
  {
    id: "raffle-winner-picker",
    name: "Raffle Winner Picker",
    category: "marketing",
    description: {
      en: "Fairly pick winners from a list using cryptographically secure algorithms.",
      zh: "使用加密安全算法从名单中公平抽取中奖者。"
    },
    scenario: {
      en: "Community operations events.",
      zh: "社群运营活动。"
    },
    tags: {
      en: ["Operations"],
      zh: ["营销运营"]
    },
  },

  // 2. Writing
  {
    id: "content-research-writer",
    name: "Content Research Writer",
    category: "writing",
    description: {
      en: "Execute a 6-stage workflow: Setup -> Outline -> Research -> Hook Optimization.",
      zh: "执行“环境设置->大纲->研究->钩子优化”的 6 阶段工作流，自动管理引用来源。"
    },
    scenario: {
      en: "Writing in-depth industry analysis articles, white papers.",
      zh: "撰写深度行业分析文章、白皮书。"
    },
    tags: {
      en: ["Content Creation"],
      zh: ["内容创作"]
    },
    isHighlight: true,
  },
  {
    id: "internal-comms",
    name: "Internal Comms",
    category: "writing",
    description: {
      en: "Standardize internal communication documents (Weekly reports, FAQs, All-hands letters).",
      zh: "标准化内部沟通文档（周报、FAQ、全员信）。"
    },
    scenario: {
      en: "Administrative announcements, project milestone syncs.",
      zh: "行政通告、项目里程碑同步。"
    },
    tags: {
      en: ["Content Creation"],
      zh: ["内容创作"]
    },
    isOfficial: true,
    url: "https://github.com/anthropics/skills/tree/main/skills/internal-comms"
  },
  {
    id: "family-history-research",
    name: "Family History Research",
    category: "writing",
    description: {
      en: "Plan genealogy research strategies and resource lists.",
      zh: "规划家谱研究策略和资源清单。"
    },
    scenario: {
      en: "Personal history research.",
      zh: "个人历史研究。"
    },
    tags: {
      en: ["Content Creation"],
      zh: ["内容创作"]
    },
  },
  {
    id: "technical-writing-standards",
    name: "Technical Writing Standards (7 Cs)",
    category: "writing",
    description: {
      en: "Enforce Clear, Concise principles, automatically remove 'anti-patterns' and vague words.",
      zh: "强制执行 Clear, Concise 等原则，自动移除“反模式”和模糊词汇。"
    },
    scenario: {
      en: "Polishing API docs, technical white papers.",
      zh: "API 文档、技术白皮书润色。"
    },
    tags: {
      en: ["Technical & Editing"],
      zh: ["技术写作与编辑"]
    },
  },
  {
    id: "changelog-generator",
    name: "Changelog Generator",
    category: "writing",
    description: {
      en: "Automatically generate user-facing Release Notes from Git Commit history.",
      zh: "从 Git Commit 历史自动生成面向用户的 Release Notes。"
    },
    scenario: {
      en: "Product version update announcements.",
      zh: "产品版本更新公告。"
    },
    tags: {
      en: ["Technical & Editing"],
      zh: ["技术写作与编辑"]
    },
  },
  {
    id: "expert-editor",
    name: "Expert Editor",
    category: "writing",
    description: {
      en: "Adopt a 'Critique -> Feedback -> Rewrite' loop instead of direct rewriting.",
      zh: "采用“批评->反馈->重写”的循环模式，而非直接重写，保留作者原意。"
    },
    scenario: {
      en: "Refining important manuscripts.",
      zh: "精修重要文稿。"
    },
    tags: {
      en: ["Technical & Editing"],
      zh: ["技术写作与编辑"]
    },
  },
  {
    id: "markdown-to-epub",
    name: "Markdown to EPUB Converter",
    category: "writing",
    description: {
      en: "Convert MD documents into professionally formatted eBooks.",
      zh: "将 MD 文档转换为排版专业的电子书。"
    },
    scenario: {
      en: "Publishing knowledge bases/blogs as books.",
      zh: "将知识库/博客集结成册发布。"
    },
    tags: {
      en: ["Format Conversion"],
      zh: ["格式转换"]
    },
  },

  // 3. Design
  {
    id: "frontend-design",
    name: "Frontend Design",
    category: "design",
    description: {
      en: "Generate HTML/CSS/React code. Pro version injects specific aesthetics (Neumorphism, Minimalism).",
      zh: "生成 HTML/CSS/React 代码。Pro 版注入特定美学（如新拟态、极简主义）以抵抗“Bootstrap 风格”的平庸。"
    },
    scenario: {
      en: "Quickly building Landing Pages or MVP prototypes.",
      zh: "快速搭建 Landing Page 或 MVP 原型。"
    },
    tags: {
      en: ["UI & Frontend"],
      zh: ["界面工程"]
    },
    isOfficial: true,
    url: "https://github.com/anthropics/skills/tree/main/skills/frontend-design"
  },
  {
    id: "web-asset-generator",
    name: "Web Asset Generator",
    category: "design",
    description: {
      en: "Automatically generate Favicons, Open Graph images, and validate dimensions.",
      zh: "自动生成 Favicon、Open Graph 图片，并校验尺寸。"
    },
    scenario: {
      en: "Asset preparation before Web project launch.",
      zh: "Web 项目上线前的资产准备。"
    },
    tags: {
      en: ["UI & Frontend"],
      zh: ["界面工程"]
    },
    url: "https://github.com/travisvn/awesome-claude-skills"
  },
  {
    id: "canvas-design",
    name: "Canvas Design",
    category: "design",
    description: {
      en: "Generate PNG/PDF designs (posters, flyers) based on aesthetic principles.",
      zh: "根据审美原则生成 PNG/PDF 设计稿（海报、传单）。"
    },
    scenario: {
      en: "Event poster drafts, illustration generation.",
      zh: "活动海报初稿、配图生成。"
    },
    tags: {
      en: ["Visual Assets"],
      zh: ["视觉资产"]
    },
    isOfficial: true,
    url: "https://github.com/anthropics/skills/tree/main/skills/canvas-design"
  },
  {
    id: "algorithmic-art",
    name: "Algorithmic Art",
    category: "design",
    description: {
      en: "Generate programmatic/mathematical art graphics using p5.js.",
      zh: "使用 p5.js 生成程序化/数学艺术图形。"
    },
    scenario: {
      en: "Generating unique background textures, data art.",
      zh: "生成独特的背景纹理、数据艺术。"
    },
    tags: {
      en: ["Visual Assets"],
      zh: ["视觉资产"]
    },
    url: "https://github.com/anthropics/skills/tree/main/skills/algorithmic-art"
  },
  {
    id: "image-enhancer",
    name: "Image Enhancer",
    category: "design",
    description: {
      en: "Improve clarity and sharpness of screenshots or low-quality images.",
      zh: "提升截图或低质图片的清晰度与锐度。"
    },
    scenario: {
      en: "Optimizing software screenshots in documents.",
      zh: "优化文档中的软件截图。"
    },
    tags: {
      en: ["Visual Assets"],
      zh: ["视觉资产"]
    },
  },
  {
    id: "slack-gif-creator",
    name: "Slack GIF Creator",
    category: "design",
    description: {
      en: "Generate GIFs that meet Slack size limits.",
      zh: "生成符合 Slack 尺寸限制的 GIF 动图。"
    },
    scenario: {
      en: "Team atmosphere building, demo presentations.",
      zh: "团队氛围建设、演示 Demo。"
    },
    tags: {
      en: ["Media Tools"],
      zh: ["媒体工具"]
    },
    url: "https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator"
  },
  {
    id: "video-downloader",
    name: "Video Downloader",
    category: "design",
    description: {
      en: "Download video footage from platforms like YouTube.",
      zh: "从 YouTube 等平台下载视频素材。"
    },
    scenario: {
      en: "Competitor video footage archiving.",
      zh: "竞品视频素材存档。"
    },
    tags: {
      en: ["Media Tools"],
      zh: ["媒体工具"]
    },
  },

  // 4. Coding
  {
    id: "superpowers-core-skills",
    name: "Superpowers Core Skills",
    category: "coding",
    description: {
      en: "Includes 20+ skills like TDD, debugging, code review, autonomous sub-agent execution.",
      zh: "包含 TDD、调试、代码审查、自主子代理执行等 20+ 技能。"
    },
    scenario: {
      en: "Complex full-stack development tasks.",
      zh: "复杂的全栈开发任务。"
    },
    tags: {
      en: ["Dev Workflow"],
      zh: ["开发流"]
    },
    isHighlight: true,
    url: "https://github.com/obra/superpowers"
  },
  {
    id: "skill-creator",
    name: "Skill Creator",
    category: "coding",
    description: {
      en: "Automatically write compliant SKILL.md files from natural language descriptions.",
      zh: "根据自然语言描述自动编写符合规范的 SKILL.md 文件。"
    },
    scenario: {
      en: "Quickly extending Claude's skill library.",
      zh: "快速扩展 Claude 的技能库。"
    },
    tags: {
      en: ["Dev Workflow"],
      zh: ["开发流"]
    },
    url: "https://github.com/anthropics/skills/tree/main/skills/skill-creator"
  },
  {
    id: "skill-seekers",
    name: "Skill Seekers",
    category: "coding",
    description: {
      en: "Input doc URL, automatically learn and generate corresponding Claude Skill.",
      zh: "输入文档 URL，自动学习并生成对应的 Claude Skill。"
    },
    scenario: {
      en: "Letting Claude quickly master internal frameworks or new libraries.",
      zh: "让 Claude 快速掌握公司内部框架或新出的库。"
    },
    tags: {
      en: ["Dev Workflow"],
      zh: ["开发流"]
    },
  },
  {
    id: "anthropic-aws-skills-pack",
    name: "Anthropic AWS Skills Pack",
    category: "coding",
    description: {
      en: "Integrate AWS CDK, cost optimization, Bedrock Agent development.",
      zh: "集成 AWS CDK、成本优化、Bedrock Agent 开发。"
    },
    scenario: {
      en: "Cloud architecture design, cost monitoring.",
      zh: "云架构设计、成本监控。"
    },
    tags: {
      en: ["Cloud & DevOps"],
      zh: ["云原生"]
    },
  },
  {
    id: "ios-simulator-skill",
    name: "iOS Simulator Skill",
    category: "coding",
    description: {
      en: "Let Claude control iOS Simulator for automated operations and testing.",
      zh: "让 Claude 控制 iOS 模拟器进行自动化操作和测试。"
    },
    scenario: {
      en: "Mobile App development and testing.",
      zh: "移动端 App 开发与测试。"
    },
    tags: {
      en: ["Cloud & DevOps"],
      zh: ["云原生"]
    },
    url: "https://github.com/travisvn/awesome-claude-skills"
  },
  {
    id: "ffuf-web-fuzzing",
    name: "FFUF Web Fuzzing",
    category: "coding",
    description: {
      en: "Integrate FFUF tool for Web fuzzing (directory busting, parameter analysis).",
      zh: "集成 FFUF 工具进行 Web 模糊测试（目录爆破、参数分析）。"
    },
    scenario: {
      en: "Security penetration testing, vulnerability scanning.",
      zh: "安全渗透测试、漏洞扫描。"
    },
    tags: {
      en: ["Security & Testing"],
      zh: ["安全与测试"]
    },
    url: "https://github.com/travisvn/awesome-claude-skills"
  },
  {
    id: "webapp-testing",
    name: "Webapp Testing (Playwright)",
    category: "coding",
    description: {
      en: "Automatically write and execute browser end-to-end tests.",
      zh: "自动编写并执行浏览器端到端测试。"
    },
    scenario: {
      en: "QA regression testing.",
      zh: "QA 回归测试。"
    },
    tags: {
      en: ["Security & Testing"],
      zh: ["安全与测试"]
    },
    url: "https://github.com/anthropics/skills/tree/main/skills/webapp-testing"
  },
  {
    id: "d3-visualization",
    name: "D3.js Visualization",
    category: "coding",
    description: {
      en: "Generate interactive data visualization code.",
      zh: "生成交互式数据可视化代码。"
    },
    scenario: {
      en: "Data Dashboard development.",
      zh: "数据 Dashboard 开发。"
    },
    tags: {
      en: ["Security & Testing"],
      zh: ["安全与测试"]
    },
    url: "https://github.com/travisvn/awesome-claude-skills"
  },

  // 5. Research
  {
    id: "article-extractor",
    name: "Article Extractor",
    category: "research",
    description: {
      en: "Extract web body text, metadata, remove ad interference.",
      zh: "提取网页正文、元数据，去除广告干扰。"
    },
    scenario: {
      en: "Cleaning before saving webpages to Obsidian/RAG database.",
      zh: "将网页存入 Obsidian/RAG 数据库前的清洗。"
    },
    tags: {
      en: ["Extraction"],
      zh: ["数据提取"]
    },
  },
  {
    id: "youtube-transcript",
    name: "YouTube Transcript",
    category: "research",
    description: {
      en: "Get video subtitles and generate summaries.",
      zh: "获取视频字幕并生成摘要。"
    },
    scenario: {
      en: "Quickly digesting long video content.",
      zh: "快速消化长视频内容。"
    },
    tags: {
      en: ["Extraction"],
      zh: ["数据提取"]
    },
  },
  {
    id: "tapestry",
    name: "Tapestry",
    category: "research",
    description: {
      en: "Connect multiple docs, build knowledge graph and generate reviews.",
      zh: "串联多份文档，构建知识网络图谱并生成综述。"
    },
    scenario: {
      en: "Literature review, multi-document comparative analysis.",
      zh: "文献综述、多文档对比分析。"
    },
    tags: {
      en: ["Analysis"],
      zh: ["深度分析"]
    },
  },
  {
    id: "meeting-insights-analyzer",
    name: "Meeting Insights Analyzer",
    category: "research",
    description: {
      en: "Analyze meeting records for speaking ratios, communication patterns, and conflicts.",
      zh: "分析会议记录的发言比例、沟通模式和潜在冲突。"
    },
    scenario: {
      en: "Team management review.",
      zh: "团队管理复盘。"
    },
    tags: {
      en: ["Analysis"],
      zh: ["深度分析"]
    },
  },
  {
    id: "claude-scientific-skills",
    name: "Claude Scientific Skills",
    category: "research",
    description: {
      en: "Includes 125+ scientific skills like bioinformatics, chemistry, statistical plotting.",
      zh: "包含生物信息、化学、统计绘图等 125+ 科研技能。"
    },
    scenario: {
      en: "Academic research, experimental data processing.",
      zh: "学术研究、实验数据处理。"
    },
    tags: {
      en: ["Domain Specific"],
      zh: ["领域专用"]
    },
    url: "https://github.com/K-Dense-AI/claude-scientific-skills"
  },

  // 6. Productivity
  {
    id: "office-suite",
    name: "Docx / PDF / XLSX / PPTX Manager",
    category: "productivity",
    description: {
      en: "Directly read, edit, and generate Office native files (non-text).",
      zh: "直接读取、编辑和生成 Office 原生文件（非纯文本）。"
    },
    scenario: {
      en: "Generating Excel reports with formulas, formatted Word contracts, PPT decks.",
      zh: "生成带公式的 Excel 报表、排版好的 Word 合同、PPT 演示文稿。"
    },
    tags: {
      en: ["Office Suite"],
      zh: ["办公套件"]
    },
    isOfficial: true,
    url: "https://github.com/anthropics/skills/tree/main/skills/docx"
  },
  {
    id: "theme-factory",
    name: "Theme Factory",
    category: "productivity",
    description: {
      en: "One-click professional design themes for docs, slides, or web apps.",
      zh: "一键为文档、幻灯片或网页应用专业设计主题。"
    },
    scenario: {
      en: "Beautifying rough internal documents.",
      zh: "美化粗糙的内部文档。"
    },
    tags: {
      en: ["Office Suite"],
      zh: ["办公套件"]
    },
    url: "https://github.com/anthropics/skills/tree/main/skills/theme-factory"
  },
  {
    id: "brainstorming",
    name: "Brainstorming",
    category: "productivity",
    description: {
      en: "Guide vague ideas into mature schemes through structured questioning.",
      zh: "通过结构化提问引导，将模糊想法转化为成熟方案。"
    },
    scenario: {
      en: "Product Feature ideation.",
      zh: "产品 Feature 构思。"
    },
    tags: {
      en: ["Thinking & Planning"],
      zh: ["思维与规划"]
    },
    isOfficial: true,
  },
  {
    id: "ship-learn-next",
    name: "Ship-Learn-Next",
    category: "productivity",
    description: {
      en: "Suggest next steps based on 'Deliver-Learn-Iterate' loop and feedback.",
      zh: "基于“交付-学习-迭代”循环，根据反馈建议下一步行动。"
    },
    scenario: {
      en: "Agile Sprint planning, personal learning path adjustment.",
      zh: "敏捷开发 Sprint 规划、个人学习路径调整。"
    },
    tags: {
      en: ["Thinking & Planning"],
      zh: ["思维与规划"]
    },
  },
  {
    id: "writing-plans",
    name: "Writing Plans",
    category: "productivity",
    description: {
      en: "Enforce detailed implementation plans (Bite-sized steps) before execution.",
      zh: "强制在执行前生成详细实施计划（Bite-sized steps）。"
    },
    scenario: {
      en: "Reducing resistance to complex tasks.",
      zh: "降低复杂任务的执行阻力。"
    },
    tags: {
      en: ["Thinking & Planning"],
      zh: ["思维与规划"]
    },
  },
];
