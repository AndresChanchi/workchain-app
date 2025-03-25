'use client';

import { ContractForm } from '@/components/organisms/ContractForm';
import { ContractCard } from '@/components/molecules/ContractCard';
import { useEffect, useState } from 'react';
import { Contract } from '@/domain/entities/Contract';
import { fetchContracts } from '@/infrastructure/api/contracts';
import { Button } from '@/components/atoms/Button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAccount } from 'wagmi';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isConnected) return;
    
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
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Please connect your wallet to view contracts.</p>
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold">My Contracts</h1>
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
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contracts.map((contract) => (
          <ContractCard
            key={contract.id}
            contract={contract}
            isFreelancer={true} // Si necesitas diferenciar roles, esto debería cambiar
            onApply={() => {
              console.log('Applying for contract:', contract.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}