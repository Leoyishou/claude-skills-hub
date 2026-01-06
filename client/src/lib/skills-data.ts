export interface Skill {
  id: string;
  name: string;
  description: string;
  scenario: string;
  tags: string[];
  category: string;
  isOfficial?: boolean;
  isCommunity?: boolean;
  isHighlight?: boolean;
  author?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: "marketing",
    name: "Marketing Skills",
    description: "Ensure brand consistency, automate competitive analysis & traffic acquisition.",
    icon: "/images/category-marketing.png",
    color: "var(--primary)",
  },
  {
    id: "writing",
    name: "Writing Skills",
    description: "From simple text generation to structured, well-cited deep creation.",
    icon: "/images/category-writing.png",
    color: "var(--secondary)",
  },
  {
    id: "design",
    name: "Design Skills",
    description: "Bridge the gap between text instructions and visual output.",
    icon: "/images/category-design.png",
    color: "var(--accent)",
  },
  {
    id: "coding",
    name: "Coding Skills",
    description: "Turn Claude into a full-stack engineer with file ops, testing & cloud capabilities.",
    icon: "/images/category-coding.png",
    color: "var(--chart-4)",
  },
  {
    id: "research",
    name: "Research Skills",
    description: "Automate information retrieval & correlation analysis for RAG & knowledge management.",
    icon: "/images/hero-banner.png", // Placeholder, reuse hero for now or generate specific if needed
    color: "var(--chart-5)",
  },
  {
    id: "productivity",
    name: "Productivity Skills",
    description: "Handle binary office files & assist in thinking/decision making.",
    icon: "/images/hero-banner.png", // Placeholder
    color: "var(--muted-foreground)",
  },
];

export const skills: Skill[] = [
  // 1. Marketing
  {
    id: "brand-guidelines",
    name: "Brand Guidelines",
    category: "marketing",
    description: "Enforce Claude to follow preset corporate colors, fonts, and Tone of Voice.",
    scenario: "Generating PRD documents or press releases that meet CI standards.",
    tags: ["Brand & Strategy"],
    isOfficial: true,
  },
  {
    id: "brand-voice-analyzer",
    name: "Brand Voice Analyzer",
    category: "marketing",
    description: "Use Python scripts to quantify text tone, formality, and perspective.",
    scenario: "Auditing outsourced copy or AI-generated drafts.",
    tags: ["Brand & Strategy"],
    isCommunity: true,
    author: "alirezarezvani",
  },
  {
    id: "domain-name-brainstormer",
    name: "Domain Name Brainstormer",
    category: "marketing",
    description: "Generate creative domain names and check availability for .com/.io/.ai.",
    scenario: "Naming new products or side projects.",
    tags: ["Brand & Strategy"],
  },
  {
    id: "competitive-ads-extractor",
    name: "Competitive Ads Extractor",
    category: "marketing",
    description: "Scrape competitor copy from ad libraries, analyze hooks and value propositions.",
    scenario: "Competitor analysis reports, finding differentiated selling points.",
    tags: ["Market Intelligence"],
  },
  {
    id: "lead-research-assistant",
    name: "Lead Research Assistant",
    category: "marketing",
    description: "Analyze product features, automate B2B lead search and generate outreach strategies.",
    scenario: "Finding seed users during cold start.",
    tags: ["Market Intelligence"],
  },
  {
    id: "content-calendar-manager",
    name: "Content Calendar Manager",
    category: "marketing",
    description: "Build content clusters and reuse chains (e.g., Blog -> Tweet), generate Notion/CSV calendars.",
    scenario: "Content marketing scheduling.",
    tags: ["Operations"],
  },
  {
    id: "raffle-winner-picker",
    name: "Raffle Winner Picker",
    category: "marketing",
    description: "Fairly pick winners from a list using cryptographically secure algorithms.",
    scenario: "Community operations events.",
    tags: ["Operations"],
  },

  // 2. Writing
  {
    id: "content-research-writer",
    name: "Content Research Writer",
    category: "writing",
    description: "Execute a 6-stage workflow: Setup -> Outline -> Research -> Hook Optimization.",
    scenario: "Writing in-depth industry analysis articles, white papers.",
    tags: ["Content Creation"],
    isHighlight: true,
  },
  {
    id: "internal-comms",
    name: "Internal Comms",
    category: "writing",
    description: "Standardize internal communication documents (Weekly reports, FAQs, All-hands letters).",
    scenario: "Administrative announcements, project milestone syncs.",
    tags: ["Content Creation"],
    isOfficial: true,
  },
  {
    id: "family-history-research",
    name: "Family History Research",
    category: "writing",
    description: "Plan genealogy research strategies and resource lists.",
    scenario: "Personal history research.",
    tags: ["Content Creation"],
  },
  {
    id: "technical-writing-standards",
    name: "Technical Writing Standards (7 Cs)",
    category: "writing",
    description: "Enforce Clear, Concise principles, automatically remove 'anti-patterns' and vague words.",
    scenario: "Polishing API docs, technical white papers.",
    tags: ["Technical & Editing"],
  },
  {
    id: "changelog-generator",
    name: "Changelog Generator",
    category: "writing",
    description: "Automatically generate user-facing Release Notes from Git Commit history.",
    scenario: "Product version update announcements.",
    tags: ["Technical & Editing"],
  },
  {
    id: "expert-editor",
    name: "Expert Editor",
    category: "writing",
    description: "Adopt a 'Critique -> Feedback -> Rewrite' loop instead of direct rewriting.",
    scenario: "Refining important manuscripts.",
    tags: ["Technical & Editing"],
  },
  {
    id: "markdown-to-epub",
    name: "Markdown to EPUB Converter",
    category: "writing",
    description: "Convert MD documents into professionally formatted eBooks.",
    scenario: "Publishing knowledge bases/blogs as books.",
    tags: ["Format Conversion"],
  },

  // 3. Design
  {
    id: "frontend-design",
    name: "Frontend Design",
    category: "design",
    description: "Generate HTML/CSS/React code. Pro version injects specific aesthetics (Neumorphism, Minimalism).",
    scenario: "Quickly building Landing Pages or MVP prototypes.",
    tags: ["UI & Frontend"],
    isOfficial: true,
  },
  {
    id: "web-asset-generator",
    name: "Web Asset Generator",
    category: "design",
    description: "Automatically generate Favicons, Open Graph images, and validate dimensions.",
    scenario: "Asset preparation before Web project launch.",
    tags: ["UI & Frontend"],
  },
  {
    id: "canvas-design",
    name: "Canvas Design",
    category: "design",
    description: "Generate PNG/PDF designs (posters, flyers) based on aesthetic principles.",
    scenario: "Event poster drafts, illustration generation.",
    tags: ["Visual Assets"],
    isOfficial: true,
  },
  {
    id: "algorithmic-art",
    name: "Algorithmic Art",
    category: "design",
    description: "Generate programmatic/mathematical art graphics using p5.js.",
    scenario: "Generating unique background textures, data art.",
    tags: ["Visual Assets"],
  },
  {
    id: "image-enhancer",
    name: "Image Enhancer",
    category: "design",
    description: "Improve clarity and sharpness of screenshots or low-quality images.",
    scenario: "Optimizing software screenshots in documents.",
    tags: ["Visual Assets"],
  },
  {
    id: "slack-gif-creator",
    name: "Slack GIF Creator",
    category: "design",
    description: "Generate GIFs that meet Slack size limits.",
    scenario: "Team atmosphere building, demo presentations.",
    tags: ["Media Tools"],
  },
  {
    id: "video-downloader",
    name: "Video Downloader",
    category: "design",
    description: "Download video footage from platforms like YouTube.",
    scenario: "Competitor video footage archiving.",
    tags: ["Media Tools"],
  },

  // 4. Coding
  {
    id: "superpowers-core-skills",
    name: "Superpowers Core Skills",
    category: "coding",
    description: "Includes 20+ skills like TDD, debugging, code review, autonomous sub-agent execution.",
    scenario: "Complex full-stack development tasks.",
    tags: ["Dev Workflow"],
    isHighlight: true,
  },
  {
    id: "skill-creator",
    name: "Skill Creator",
    category: "coding",
    description: "Automatically write compliant SKILL.md files from natural language descriptions.",
    scenario: "Quickly extending Claude's skill library.",
    tags: ["Dev Workflow"],
  },
  {
    id: "skill-seekers",
    name: "Skill Seekers",
    category: "coding",
    description: "Input doc URL, automatically learn and generate corresponding Claude Skill.",
    scenario: "Letting Claude quickly master internal frameworks or new libraries.",
    tags: ["Dev Workflow"],
  },
  {
    id: "anthropic-aws-skills-pack",
    name: "Anthropic AWS Skills Pack",
    category: "coding",
    description: "Integrate AWS CDK, cost optimization, Bedrock Agent development.",
    scenario: "Cloud architecture design, cost monitoring.",
    tags: ["Cloud & DevOps"],
  },
  {
    id: "ios-simulator-skill",
    name: "iOS Simulator Skill",
    category: "coding",
    description: "Let Claude control iOS Simulator for automated operations and testing.",
    scenario: "Mobile App development and testing.",
    tags: ["Cloud & DevOps"],
  },
  {
    id: "ffuf-web-fuzzing",
    name: "FFUF Web Fuzzing",
    category: "coding",
    description: "Integrate FFUF tool for Web fuzzing (directory busting, parameter analysis).",
    scenario: "Security penetration testing, vulnerability scanning.",
    tags: ["Security & Testing"],
  },
  {
    id: "webapp-testing",
    name: "Webapp Testing (Playwright)",
    category: "coding",
    description: "Automatically write and execute browser end-to-end tests.",
    scenario: "QA regression testing.",
    tags: ["Security & Testing"],
  },
  {
    id: "d3-visualization",
    name: "D3.js Visualization",
    category: "coding",
    description: "Generate interactive data visualization code.",
    scenario: "Data Dashboard development.",
    tags: ["Security & Testing"],
  },

  // 5. Research
  {
    id: "article-extractor",
    name: "Article Extractor",
    category: "research",
    description: "Extract web body text, metadata, remove ad interference.",
    scenario: "Cleaning before saving webpages to Obsidian/RAG database.",
    tags: ["Extraction"],
  },
  {
    id: "youtube-transcript",
    name: "YouTube Transcript",
    category: "research",
    description: "Get video subtitles and generate summaries.",
    scenario: "Quickly digesting long video content.",
    tags: ["Extraction"],
  },
  {
    id: "tapestry",
    name: "Tapestry",
    category: "research",
    description: "Connect multiple docs, build knowledge graph and generate reviews.",
    scenario: "Literature review, multi-document comparative analysis.",
    tags: ["Analysis"],
  },
  {
    id: "meeting-insights-analyzer",
    name: "Meeting Insights Analyzer",
    category: "research",
    description: "Analyze meeting records for speaking ratios, communication patterns, and conflicts.",
    scenario: "Team management review.",
    tags: ["Analysis"],
  },
  {
    id: "claude-scientific-skills",
    name: "Claude Scientific Skills",
    category: "research",
    description: "Includes 125+ scientific skills like bioinformatics, chemistry, statistical plotting.",
    scenario: "Academic research, experimental data processing.",
    tags: ["Domain Specific"],
  },

  // 6. Productivity
  {
    id: "office-suite",
    name: "Docx / PDF / XLSX / PPTX Manager",
    category: "productivity",
    description: "Directly read, edit, and generate Office native files (non-text).",
    scenario: "Generating Excel reports with formulas, formatted Word contracts, PPT decks.",
    tags: ["Office Suite"],
    isOfficial: true,
  },
  {
    id: "theme-factory",
    name: "Theme Factory",
    category: "productivity",
    description: "One-click professional design themes for docs, slides, or web apps.",
    scenario: "Beautifying rough internal documents.",
    tags: ["Office Suite"],
  },
  {
    id: "brainstorming",
    name: "Brainstorming",
    category: "productivity",
    description: "Guide vague ideas into mature schemes through structured questioning.",
    scenario: "Product Feature ideation.",
    tags: ["Thinking & Planning"],
    isOfficial: true,
  },
  {
    id: "ship-learn-next",
    name: "Ship-Learn-Next",
    category: "productivity",
    description: "Suggest next steps based on 'Deliver-Learn-Iterate' loop and feedback.",
    scenario: "Agile Sprint planning, personal learning path adjustment.",
    tags: ["Thinking & Planning"],
  },
  {
    id: "writing-plans",
    name: "Writing Plans",
    category: "productivity",
    description: "Enforce detailed implementation plans (Bite-sized steps) before execution.",
    scenario: "Reducing resistance to complex tasks.",
    tags: ["Thinking & Planning"],
  },
];
