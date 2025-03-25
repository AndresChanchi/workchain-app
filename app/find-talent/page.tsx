'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { TalentCard } from '@/interfaces/TalentDiscovery/TalentCard';
import { SkillFilter } from '@/interfaces/TalentDiscovery/SkillFilter';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockTalents } from '@/infrastructure/api/mockTalents';

export default function FindTalentPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const { isConnected } = useAccount();
  const router = useRouter();
  const { toast } = useToast();

  const filteredTalents = mockTalents.filter(talent => {
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.every(skill => talent.skills.includes(skill));
    
    const matchesSearch = searchQuery === '' || 
      talent.skills.some(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesSkills && matchesSearch;
  });

  const handleContact = (freelancerAddress: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to contact freelancers.",
        variant: "destructive"
      });
      return;
    }
    router.push(`/negotiation?context=talent&freelancerId=${freelancerAddress}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Talented Freelancers</h1>

      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        <div className="space-y-6">
          <div>
            <Label>Search Skills</Label>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill..."
              className="mt-1"
            />
          </div>

          <div>
            <Label>Filter by Skills</Label>
            <SkillFilter
              selectedSkills={selectedSkills}
              onSkillsChange={setSelectedSkills}
            />
          </div>

          <div>
            <Label>Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="completedJobs">Completed Jobs</SelectItem>
                <SelectItem value="hourlyRate">Hourly Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTalents.map((talent) => (
            <TalentCard
              key={talent.address}
              freelancer={{
                address: talent.address,
                role: 'freelancer',
                skills: talent.skills,
                completedJobs: talent.completedJobs,
                rating: talent.rating,
                hourlyRate: talent.hourlyRate
              }}
              onContact={() => handleContact(talent.address)}
            />
          ))}
          {filteredTalents.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                No freelancers found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}