import { useState } from "react";
import { categories, skills } from "@/lib/skills-data";
import { SkillCard } from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="min-h-screen bg-background font-body pb-20">
      {/* Hero Section */}
      <header className="relative border-b-4 border-black bg-white">
        <div className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <div className="inline-block bg-black text-white px-3 py-1 font-mono text-sm font-bold transform -rotate-2">
              OPEN SOURCE SKILLS LIBRARY
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-none tracking-tighter">
              CLAUDE <br/>
              <span className="text-primary">SKILLS</span> HUB
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-xl border-l-4 border-primary pl-4 py-2 bg-muted/30">
              A curated collection of capabilities to supercharge your AI workflow.
              Categorized for PMs, Developers, and Creators.
            </p>
            <div className="flex gap-4 pt-4">
              <Button className="neo-border neo-shadow hover:neo-shadow-hover active:neo-shadow-active h-12 px-8 text-lg font-bold rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                Explore Skills
              </Button>
              <Button variant="outline" className="neo-border neo-shadow hover:neo-shadow-hover active:neo-shadow-active h-12 px-8 text-lg font-bold rounded-none bg-white text-black hover:bg-gray-50">
                Contribute
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

      {/* Category Filter */}
      <section className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b-2 border-black py-4 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 md:gap-4 min-w-max">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
              className={cn(
                "rounded-none font-bold border-2 border-black transition-all",
                activeCategory === "all" 
                  ? "bg-black text-white neo-shadow" 
                  : "bg-white text-black hover:bg-gray-100"
              )}
            >
              ALL SKILLS
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "rounded-none font-bold border-2 border-black transition-all flex items-center gap-2",
                  activeCategory === category.id 
                    ? "bg-primary text-primary-foreground neo-shadow" 
                    : "bg-white text-black hover:bg-gray-100"
                )}
                style={activeCategory === category.id ? { backgroundColor: category.color } : {}}
              >
                {category.name.split(" ")[0].toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Category Description */}
        {activeCategory !== "all" && (
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
                {categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-xl font-medium text-muted-foreground">
                {categories.find(c => c.id === activeCategory)?.description}
              </p>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-20 border-4 border-dashed border-black/20">
            <h3 className="text-2xl font-bold text-muted-foreground">No skills found in this category.</h3>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t-4 border-primary">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-display font-bold">CLAUDE SKILLS HUB</h2>
            <p className="text-gray-400 mt-2">Curated for PMs & Developers.</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm text-gray-500">
              © 2026 Manus AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
