'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { JobCard } from '@/interfaces/jobs/JobCard';
import { SkillFilter } from '@/interfaces/jobs/SkillFilter';
import { mockJobs } from '@/infrastructure/api/mockJobs';
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

export default function FindWorkPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const { isConnected } = useAccount();
  const router = useRouter();
  const { toast } = useToast();

  const allSkills = Array.from(
    new Set(mockJobs.flatMap(job => job.skills))
  );

  const filteredJobs = mockJobs
    .filter(job => {
      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.every(skill => job.skills.includes(skill));
      
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSkills && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'budget-high':
          return b.budget - a.budget;
        case 'budget-low':
          return a.budget - b.budget;
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleApply = (jobId: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your wallet to apply for jobs.",
        variant: "destructive"
      });
      return;
    }
    router.push(`/negotiation?context=work&jobId=${jobId}`);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Work</h1>
        <p className="text-gray-600">Browse available jobs that match your skills</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px,1fr]">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="space-y-4">
              <div>
                <Label className="text-gray-700">Search Jobs</Label>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, description, or skills..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-gray-700">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Most Recent</SelectItem>
                    <SelectItem value="budget-high">Highest Budget</SelectItem>
                    <SelectItem value="budget-low">Lowest Budget</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <SkillFilter
              allSkills={allSkills}
              selectedSkills={selectedSkills}
              onSkillChange={setSelectedSkills}
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                {...job}
                onApply={() => handleApply(job.id)}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">
                Try adjusting your search filters or check back later
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}