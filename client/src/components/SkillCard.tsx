import { Skill } from "@/lib/skills-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink } from "lucide-react";

interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export function SkillCard({ skill, className }: SkillCardProps) {
  const { language, t } = useLanguage();

  const CardWrapper = skill.url ? 'a' : 'div';
  const wrapperProps = skill.url ? {
    href: skill.url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "block h-full"
  } : { className: "block h-full" };

  return (
    <CardWrapper {...wrapperProps}>
      <Card className={cn(
        "h-full flex flex-col transition-all duration-200",
        "neo-border neo-shadow hover:neo-shadow-hover active:neo-shadow-active",
        "bg-card text-card-foreground",
        skill.url && "cursor-pointer hover:bg-accent/5",
        className
      )}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-bold leading-tight">{skill.name}</CardTitle>
              {skill.url && <ExternalLink className="w-4 h-4 text-muted-foreground" />}
            </div>
            <div className="flex flex-col gap-1 items-end">
              {skill.isOfficial && (
                <Badge variant="secondary" className="neo-border text-xs shrink-0 bg-primary text-primary-foreground">
                  {t('card.official')}
                </Badge>
              )}
              {skill.isCommunity && (
                <Badge variant="outline" className="neo-border text-xs shrink-0">
                  {t('card.community')}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {skill.tags[language].map((tag: string) => (
              <span key={tag} className="text-xs font-mono bg-muted px-1 py-0.5 border border-black">
                #{tag}
              </span>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow pb-3">
          <p className="text-sm font-medium mb-2">{skill.description[language]}</p>
          <div className="bg-muted/50 p-2 border border-black/20 text-xs font-mono mt-2">
            <span className="font-bold">{t('card.scenario')}</span> {skill.scenario[language]}
          </div>
        </CardContent>
        <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between items-center">
          {skill.author && <span>{t('card.by')} {skill.author}</span>}
          {skill.isHighlight && (
            <span className="ml-auto font-bold text-primary flex items-center gap-1">
              {t('card.recommended')}
            </span>
          )}
        </CardFooter>
      </Card>
    </CardWrapper>
  );
}
