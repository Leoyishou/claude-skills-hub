import { Skill } from "@/lib/skills-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export function SkillCard({ skill, className }: SkillCardProps) {
  return (
    <Card className={cn(
      "h-full flex flex-col transition-all duration-200",
      "neo-border neo-shadow hover:neo-shadow-hover active:neo-shadow-active",
      "bg-card text-card-foreground",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl font-bold leading-tight">{skill.name}</CardTitle>
          {skill.isOfficial && (
            <Badge variant="secondary" className="neo-border text-xs shrink-0 bg-primary text-primary-foreground">
              Official
            </Badge>
          )}
          {skill.isCommunity && (
            <Badge variant="outline" className="neo-border text-xs shrink-0">
              Community
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {skill.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono bg-muted px-1 py-0.5 border border-black">
              #{tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-3">
        <p className="text-sm font-medium mb-2">{skill.description}</p>
        <div className="bg-muted/50 p-2 border border-black/20 text-xs font-mono mt-2">
          <span className="font-bold">Scenario:</span> {skill.scenario}
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between items-center">
        {skill.author && <span>By {skill.author}</span>}
        {skill.isHighlight && (
          <span className="ml-auto font-bold text-primary flex items-center gap-1">
            ★ Highly Recommended
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
