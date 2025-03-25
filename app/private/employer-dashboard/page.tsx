'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { JobForm } from '@/interfaces/JobManagement/JobForm';
import { JobCard } from '@/interfaces/JobManagement/JobCard';
import { Button } from '@/components/atoms/Button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Contract } from '@/core/contracts/ContractValidator';

export default function EmployerDashboardPage() {
  const { address, isConnected } = useAccount();
  const [contracts, setContracts] = useState<Contract[]>([]);

  const handleCreateJob = async (data: any) => {
    if (!isConnected || !address) {
      console.error('No wallet connected');
      return;
    }

    const newContract: Contract = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      skills: data.skills.split(',').map((s: string) => s.trim()),
      status: 'open',
      employerAddress: address,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setContracts([newContract, ...contracts]);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        {isConnected && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Post a New Job</DialogTitle>
              </DialogHeader>
              <JobForm onSubmit={handleCreateJob} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contracts.map((contract) => (
          <JobCard key={contract.id} contract={contract} />
        ))}
        {contracts.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">
              You haven't posted any jobs yet. Click the "Post New Job" button to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}