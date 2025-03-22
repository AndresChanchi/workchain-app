'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ContractForm } from '@/components/organisms/ContractForm';
import { ContractCard } from '@/components/molecules/ContractCard';
import { useEffect, useState } from 'react';
import { Contract } from '@/domain/entities/Contract';
import { fetchContracts } from '@/infrastructure/api/contracts';
import { Button } from '@/components/atoms/Button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function DashboardPage() {
  const { user } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContracts = async () => {
      try {
        const data = await fetchContracts();
        setContracts(data);
      } catch (error) {
        console.error('Failed to fetch contracts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContracts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {user?.role === 'employer' ? 'My Contracts' : 'Available Contracts'}
        </h1>
        {user?.role === 'employer' && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Contract
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Contract</DialogTitle>
              </DialogHeader>
              <ContractForm />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contracts.map((contract) => (
          <ContractCard
            key={contract.id}
            contract={contract}
            isFreelancer={user?.role === 'freelancer'}
            onApply={() => {
              // Handle contract application
              console.log('Applying for contract:', contract.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}