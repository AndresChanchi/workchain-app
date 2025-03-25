'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/atoms/Button';
import { X } from 'lucide-react';

interface SkillFilterProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export function SkillFilter({ selectedSkills, onSkillsChange }: SkillFilterProps) {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (skillInput.trim() && !selectedSkills.includes(skillInput.trim())) {
      onSkillsChange([...selectedSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onSkillsChange(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddSkill} className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Add a skill (e.g., React)"
          className="flex-1"
        />
        <Button type="submit" variant="outline">Add</Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {selectedSkills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {skill}
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}