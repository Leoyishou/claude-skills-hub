import { useState, useMemo } from "react";
import { useSkillsData, useSeedDatabase } from "@/hooks/useSkillsData";
import { SkillCard } from "@/components/SkillCard";
import { WhatIsSkills } from "@/components/WhatIsSkills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { Globe, Database, Loader2, Search, X } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  const { user, isAuthenticated } = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { language, setLanguage, t } = useLanguage();
  
  // Use database data with static fallback
  const { skills, categories, isLoading, isFromDatabase } = useSkillsData();
  const { seedFromScript, isLoading: isSeedingLoading } = useSeedDatabase();

  // Filter skills by category and search query
  const filteredSkills = useMemo(() => {
    let result = skills;
    
    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(skill => skill.category === activeCategory);
    }
    
    // Filter by search query (supports both Chinese and English)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(skill => {
        // Search in name
        const nameMatch = skill.name.toLowerCase().includes(query);
        
        // Search in description (both languages)
        const descEnMatch = skill.description.en.toLowerCase().includes(query);
        const descZhMatch = skill.description.zh.toLowerCase().includes(query);
        
        // Search in scenario (both languages)
        const scenarioEnMatch = skill.scenario.en.toLowerCase().includes(query);
        const scenarioZhMatch = skill.scenario.zh.toLowerCase().includes(query);
        
        // Search in tags (both languages)
        const tagsEnMatch = skill.tags.en.some(tag => tag.toLowerCase().includes(query));
        const tagsZhMatch = skill.tags.zh.some(tag => tag.toLowerCase().includes(query));
        
        // Search in author
        const authorMatch = skill.author?.toLowerCase().includes(query) || false;
        
        return nameMatch || descEnMatch || descZhMatch || scenarioEnMatch || scenarioZhMatch || tagsEnMatch || tagsZhMatch || authorMatch;
      });
    }
    
    return result;
  }, [skills, activeCategory, searchQuery]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const handleSeedDatabase = async () => {
    try {
      const result = await seedFromScript();
      toast.success(`数据库初始化成功！已导入 ${result.categoriesCount} 个分类和 ${result.skillsCount} 个技能。`);
      // Reload to fetch from database
      window.location.reload();
    } catch (error) {
      toast.error("数据库初始化失败，请确保已登录并重试。");
      console.error("Seed error:", error);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background font-body pb-20">
      {/* Language Switcher & Admin Controls */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        {/* Admin Seed Button - Only show for authenticated users when not using database */}
        {isAuthenticated && !isFromDatabase && !isLoading && (
          <Button 
            onClick={handleSeedDatabase}
            disabled={isSeedingLoading}
            variant="outline" 
            className="neo-border neo-shadow hover:neo-shadow-hover active:neo-shadow-active bg-green-500 text-white font-bold gap-2"
          >
            {isSeedingLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Database className="w-4 h-4" />
            )}
            {language === 'en' ? 'Init DB' : '初始化数据库'}
          </Button>
        )}
        <Button 
          onClick={toggleLanguage}
          variant="outline" 
          className="neo-border neo-shadow hover:neo-shadow-hover active:neo-shadow-active bg-white text-black font-bold gap-2"
        >
          <Globe className="w-4 h-4" />
          {language === 'en' ? '中文' : 'English'}
        </Button>
      </div>

      {/* Hero Section */}
      <header className="relative border-b-4 border-black bg-white">
        <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <div className="inline-block bg-black text-white px-3 py-1 font-mono text-sm font-bold transform -rotate-2">
              {t('hero.tagline')}
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-none tracking-tighter">
              {t('hero.title.prefix')} <br/>
              <span className="text-primary">{t('hero.title.suffix')}</span> {t('hero.title.hub')}
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-xl border-l-4 border-primary pl-4 py-2 bg-muted/30">
              {t('hero.description')}
            </p>
            <div className="flex gap-4 pt-4">
              <Button 
                className="neo-border neo-shadow hover:neo-shadow-hover active:neo-shadow-active h-12 px-8 text-lg font-bold rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => document.getElementById('skills-list-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.button.explore')}
              </Button>
              <Button variant="outline" className="neo-border neo-shadow hover:neo-shadow-hover active:neo-shadow-active h-12 px-8 text-lg font-bold rounded-none bg-white text-black hover:bg-gray-50">
                {t('hero.button.contribute')}
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md md:max-w-lg relative">
            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 border-2 border-black"></div>
            <img 
              src="/images/hero-banner.png" 
              alt="Claude Skills Hub Hero" 
              className="relative w-full h-auto border-4 border-black z-10 bg-white object-cover aspect-video"
            />
          </div>
        </div>
      </header>

      {/* What Is Skills Section */}
      <WhatIsSkills />

      {/* Search and Category Filter */}
      <section id="skills-list-section" className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b-2 border-black py-4">
        <div className="container mx-auto px-4 space-y-4">
          {/* Search Box */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={language === 'en' ? 'Search skills by name, description, or tags...' : '按名称、描述或标签搜索技能...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-10 h-12 text-lg rounded-none border-2 border-black font-medium focus-visible:ring-primary focus-visible:ring-offset-0"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
              className={cn(
                "rounded-none font-bold border-2 border-black transition-all shrink-0",
                activeCategory === "all" 
                  ? "bg-black text-white neo-shadow" 
                  : "bg-white text-black hover:bg-gray-100"
              )}
            >
              {t('filter.all')}
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "rounded-none font-bold border-2 border-black transition-all flex items-center gap-2 shrink-0",
                  activeCategory === category.id 
                    ? "bg-primary text-primary-foreground neo-shadow" 
                    : "bg-white text-black hover:bg-gray-100"
                )}
                style={activeCategory === category.id ? { backgroundColor: category.color } : {}}
              >
                {t(category.name)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Search Results Info */}
        {!isLoading && searchQuery && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-lg font-medium">
              {language === 'en' 
                ? `Found ${filteredSkills.length} skill${filteredSkills.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `找到 ${filteredSkills.length} 个与"${searchQuery}"相关的技能`
              }
            </p>
            <Button
              variant="ghost"
              onClick={clearSearch}
              className="text-muted-foreground hover:text-foreground"
            >
              {language === 'en' ? 'Clear search' : '清除搜索'}
            </Button>
          </div>
        )}

        {/* Category Description */}
        {!isLoading && !searchQuery && activeCategory !== "all" && (
          <div className="mb-12 flex items-start gap-6 border-4 border-black p-6 bg-white neo-shadow-lg">
            <div className="w-24 h-24 shrink-0 border-2 border-black bg-muted hidden md:block">
              <img 
                src={categories.find(c => c.id === activeCategory)?.icon} 
                alt={activeCategory}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold mb-2 uppercase">
                {t(categories.find(c => c.id === activeCategory)?.name || '')}
              </h2>
              <p className="text-xl font-medium text-muted-foreground">
                {t(`${categories.find(c => c.id === activeCategory)?.name}.desc`)}
              </p>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredSkills.length === 0 && (
          <div className="text-center py-20 border-4 border-dashed border-black/20">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold text-muted-foreground mb-2">
              {searchQuery 
                ? (language === 'en' ? 'No skills found' : '未找到技能')
                : t('empty.message')
              }
            </h3>
            {searchQuery && (
              <p className="text-muted-foreground mb-4">
                {language === 'en' 
                  ? 'Try different keywords or clear the search'
                  : '尝试不同的关键词或清除搜索'
                }
              </p>
            )}
            {searchQuery && (
              <Button
                variant="outline"
                onClick={clearSearch}
                className="neo-border"
              >
                {language === 'en' ? 'Clear search' : '清除搜索'}
              </Button>
            )}
          </div>
        )}

        {/* Data Source Indicator */}
        {!isLoading && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {isFromDatabase ? (
              <span className="inline-flex items-center gap-1">
                <Database className="w-4 h-4" />
                {language === 'en' ? 'Data loaded from database' : '数据来自数据库'}
              </span>
            ) : (
              <span>
                {language === 'en' ? 'Using static data' : '使用静态数据'}
              </span>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t-4 border-primary">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-display font-bold">CLAUDE SKILLS HUB</h2>
            <p className="text-gray-400 mt-2">{t('footer.curated')}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm text-gray-500">
              {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
