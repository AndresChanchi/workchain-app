'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/atoms/Button';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  budget: number;
  employerPseudonym: string;
  status: "open" | "in-progress" | "completed";
  skills: string[];
  createdAt: string;
  onApply?: () => void;
}

export function JobCard({
  title,
  description,
  budget,
  employerPseudonym,
  status,
  skills,
  createdAt,
  onApply
}: JobCardProps) {
  const statusVariants = {
    open: "default",
    "in-progress": "secondary",
    completed: "outline"
  } as const;

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <h3 className="font-semibold text-xl">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Posted by {employerPseudonym}
          </p>
        </div>
        <Badge variant={statusVariants[status]}>
          {status.replace('-', ' ')}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">
              ${budget.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </div>
          {status === "open" && onApply && (
            <Button onClick={onApply}>
              Apply Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}