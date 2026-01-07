import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Quote } from "lucide-react";

export function WhatIsSkills() {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: "What is Claude Skills?",
      description: "Skills are specialized instruction sets that give Claude new capabilities. Think of them as 'apps' for your AI assistant - enabling it to write code, analyze data, or manage projects with expert-level proficiency.",
      creator: {
        name: "Alex Albert",
        role: "Head of Claude Relations at Anthropic",
        quote: "Skills are a glimpse into how much capability is already inside current models, just waiting to be unlocked by better prompts."
      },
      video: {
        title: "Claude Skills Explained",
        author: "Eric Tech",
        duration: "22:49"
      }
    },
    zh: {
      title: "什么是 Claude Skills？",
      description: "Skills 是赋予 Claude 新能力的专业指令集。把它们想象成你的 AI 助手的“应用程序”——让它能够以专家级的水平编写代码、分析数据或管理项目。",
      creator: {
        name: "Alex Albert",
        role: "Anthropic Claude 关系负责人",
        quote: "Skills 让我们得以一窥当前模型内部蕴藏的巨大潜力，这些能力正等待着通过更好的提示词被解锁。"
      },
      video: {
        title: "Claude Skills 详解",
        author: "Eric Tech",
        duration: "22:49"
      }
    }
  };

  const current = content[language];

  return (
    <section className="py-16 border-b-4 border-black bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 font-display uppercase tracking-tight">
          {current.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Explanation & Creator */}
          <div className="space-y-12">
            <div className="bg-secondary p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xl md:text-2xl font-medium leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-32 h-32 shrink-0 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-primary">
                <img 
                  src="/images/alex-albert.png" 
                  alt="Alex Albert" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <div className="relative">
                  <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary opacity-20 rotate-180" />
                  <p className="text-lg italic font-medium relative z-10">
                    "{current.creator.quote}"
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display uppercase">{current.creator.name}</h3>
                  <p className="text-muted-foreground font-mono text-sm">{current.creator.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Video & Visual */}
          <div className="space-y-8">
            {/* Video Card */}
            <a 
              href="https://www.youtube.com/watch?v=bFC1QGEQ2E8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group relative aspect-video bg-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <img 
                src="https://img.youtube.com/vi/bFC1QGEQ2E8/maxresdefault.jpg" 
                alt="Claude Skills Video" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary border-4 border-black flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-black fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black p-4 text-white">
                <div className="flex justify-between items-center">
                  <span className="font-bold font-display uppercase truncate mr-4">{current.video.title}</span>
                  <span className="font-mono text-sm bg-primary text-black px-2 py-0.5 rounded-sm border border-white/20">
                    {current.video.duration}
                  </span>
                </div>
              </div>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
