'use client';

import { Badge } from '@/components/ui/badge';

interface SkillFilterProps {
  allSkills: string[];
  selectedSkills: string[];
  onSkillChange: (skills: string[]) => void;
}

export function SkillFilter({
  allSkills,
  selectedSkills,
  onSkillChange
}: SkillFilterProps) {
  return (
    <div className="bg-card p-4 rounded-lg border shadow-sm">
      <h3 className="font-medium mb-3">Filter by Skills</h3>
      <div className="flex flex-wrap gap-2">
        {allSkills.map((skill) => (
          <Badge
            key={skill}
            variant={selectedSkills.includes(skill) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/90 transition-colors"
            onClick={() => {
              onSkillChange(
                selectedSkills.includes(skill)
                  ? selectedSkills.filter(s => s !== skill)
                  : [...selectedSkills, skill]
              );
            }}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}