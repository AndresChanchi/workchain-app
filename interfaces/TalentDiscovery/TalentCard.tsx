'use client';

import { User } from '@/core/users/AuthService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/atoms/Button';
import { Star } from 'lucide-react';

interface TalentCardProps {
  freelancer: User & {
    skills: string[];
    completedJobs: number;
    rating: number;
    hourlyRate: number;
  };
  onContact?: () => void;
}

export function TalentCard({ freelancer, onContact }: TalentCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">
              {freelancer.address.slice(0, 6)}...{freelancer.address.slice(-4)}
            </CardTitle>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="ml-1 text-sm">{freelancer.rating.toFixed(1)}</span>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {freelancer.completedJobs} jobs completed
              </span>
            </div>
          </div>
          <span className="text-lg font-semibold">${freelancer.hourlyRate}/hr</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {freelancer.skills.map((skill) => (
            <Badge key={skill} variant="outline">{skill}</Badge>
          ))}
        </div>
        <Button onClick={onContact} className="w-full">
          Contact Freelancer
        </Button>
      </CardContent>
    </Card>
  );
}