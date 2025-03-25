'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface NegotiationFormData {
  proposalMessage: string;
  expectedDuration: string;
  proposedBudget: number;
}

interface NegotiationFormProps {
  onSubmit: (data: NegotiationFormData) => Promise<void>;
  initialBudget: number;
}

export function NegotiationForm({ onSubmit, initialBudget }: NegotiationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<NegotiationFormData>({
    defaultValues: {
      proposedBudget: initialBudget,
    },
  });

  const handleFormSubmit = async (data: NegotiationFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast({
        title: 'Success',
        description: 'Your proposal has been submitted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit proposal.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="proposalMessage">Proposal Message</Label>
        <Textarea
          id="proposalMessage"
          {...register('proposalMessage', { required: 'Proposal message is required' })}
          className="mt-1"
          placeholder="Describe your approach and why you're the best fit for this project..."
          rows={4}
        />
        {errors.proposalMessage && (
          <p className="text-sm text-destructive mt-1">{errors.proposalMessage.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="expectedDuration">Expected Duration</Label>
        <Input
          id="expectedDuration"
          {...register('expectedDuration', { required: 'Expected duration is required' })}
          className="mt-1"
          placeholder="e.g., 2 weeks, 1 month"
        />
        {errors.expectedDuration && (
          <p className="text-sm text-destructive mt-1">{errors.expectedDuration.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="proposedBudget">Proposed Budget (USD)</Label>
        <Input
          id="proposedBudget"
          type="number"
          {...register('proposedBudget', {
            required: 'Budget is required',
            min: { value: 1, message: 'Budget must be greater than 0' }
          })}
          className="mt-1"
        />
        {errors.proposedBudget && (
          <p className="text-sm text-destructive mt-1">{errors.proposedBudget.message}</p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        Submit Proposal
      </Button>
    </form>
  );
}