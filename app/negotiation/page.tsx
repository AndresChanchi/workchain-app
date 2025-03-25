'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAccount } from 'wagmi';
import { NegotiationForm } from '@/components/organisms/NegotiationForm';
import { NegotiationCard } from '@/components/molecules/NegotiationCard';
import { mockNegotiations } from '@/infrastructure/api/mockNegotiations';
import { Button } from '@/components/atoms/Button';
import { useToast } from '@/components/ui/use-toast';
import { redirect } from 'next/navigation';

export default function NegotiationPage() {
  const { isConnected } = useAccount();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const context = searchParams.get('context');
  const [negotiation, setNegotiation] = useState(mockNegotiations[0]);

  if (!isConnected) {
    redirect('/home');
  }

  const handleSubmitProposal = async (data: any) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNegotiation(prev => ({
        ...prev,
        proposalMessage: data.proposalMessage,
        expectedDuration: data.expectedDuration,
        budget: data.proposedBudget,
        status: 'pending',
        updatedAt: new Date().toISOString()
      }));

      toast({
        title: 'Proposal Submitted',
        description: 'Your proposal has been sent successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit proposal. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          {context === 'work' ? 'Apply for Job' : 'Contact Freelancer'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {context === 'work'
            ? 'Submit your proposal for this job opportunity'
            : 'Discuss your project with this freelancer'}
        </p>

        <div className="grid gap-8">
          <NegotiationCard negotiation={negotiation} />
          
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-6">Submit Your Proposal</h2>
            <NegotiationForm
              onSubmit={handleSubmitProposal}
              initialBudget={negotiation.budget}
            />
          </div>
        </div>
      </div>
    </div>
  );
}