'use client';

import { useState, useEffect } from 'react';
import { JobCard } from '@/interfaces/JobManagement/JobCard';
import { Contract } from '@/core/contracts/ContractValidator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAccount } from 'wagmi';

export default function FreelancerDashboardPage() {
  const { address } = useAccount();
  const { toast } = useToast();
  const [availableContracts, setAvailableContracts] = useState<Contract[]>([]);
  const [appliedContracts, setAppliedContracts] = useState<Contract[]>([]);

  useEffect(() => {
    // Mock data - In production, this would fetch from an API
    setAvailableContracts([
      {
        id: '1',
        title: 'React Developer Needed',
        description: 'Looking for a React developer to build a modern web application',
        budget: 5000,
        skills: ['React', 'TypeScript', 'Node.js'],
        status: 'open',
        employerAddress: '0x123...',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }, []);

  const handleApplyToContract = async (contract: Contract) => {
    try {
      // Mock application process - In production, this would call an API
      setAppliedContracts([...appliedContracts, contract]);
      setAvailableContracts(availableContracts.filter(c => c.id !== contract.id));
      
      toast({
        title: 'Application Submitted',
        description: 'Your application has been submitted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Freelancer Dashboard</h1>

      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">Available Jobs</TabsTrigger>
          <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableContracts.map((contract) => (
              <JobCard
                key={contract.id}
                contract={contract}
                onApply={() => handleApplyToContract(contract)}
              />
            ))}
            {availableContracts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No available jobs found. Check back later for new opportunities.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="applied">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appliedContracts.map((contract) => (
              <JobCard
                key={contract.id}
                contract={contract}
              />
            ))}
            {appliedContracts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  You haven't applied to any jobs yet. Browse available jobs to get started.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}