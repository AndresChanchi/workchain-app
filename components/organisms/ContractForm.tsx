'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateContractDTO } from '@/domain/entities/Contract';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createContract } from '@/infrastructure/api/contracts';
import { useToast } from '@/components/ui/use-toast';

export function ContractForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateContractDTO>();

  const onSubmit = async (data: CreateContractDTO) => {
    setIsSubmitting(true);
    try {
      await createContract(data);
      toast({
        title: 'Success',
        description: 'Contract created successfully',
      });
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create contract',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="mt-1"
        />
        {errors.title && (
          <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className="mt-1"
        />
        {errors.description && (
          <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="budget">Budget (USD)</Label>
        <Input
          id="budget"
          type="number"
          {...register('budget', { required: 'Budget is required', min: 0 })}
          className="mt-1"
        />
        {errors.budget && (
          <p className="text-sm text-destructive mt-1">{errors.budget.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input
          id="skills"
          {...register('skills', { 
            required: 'Skills are required',
            setValueAs: (v: string) => v.split(',').map(s => s.trim())
          })}
          className="mt-1"
          placeholder="React, TypeScript, Web3"
        />
        {errors.skills && (
          <p className="text-sm text-destructive mt-1">{errors.skills.message}</p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        Create Contract
      </Button>
    </form>
  );
}