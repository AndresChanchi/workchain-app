'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ContractValidator } from '@/core/contracts/ContractValidator';
import { useToast } from '@/components/ui/use-toast';

interface JobFormData {
  title: string;
  description: string;
  budget: number;
  skills: string;
}

interface JobFormProps {
  onSubmit: (data: JobFormData) => Promise<void>;
}

export function JobForm({ onSubmit }: JobFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<JobFormData>();

  const handleFormSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    try {
      const skills = data.skills.split(',').map(skill => skill.trim());
      const validationErrors = ContractValidator.validateContract({
        ...data,
        skills,
      });

      if (validationErrors.length > 0) {
        toast({
          title: 'Validation Error',
          description: validationErrors.join(', '),
          variant: 'destructive',
        });
        return;
      }

      await onSubmit(data);
      reset();
      toast({
        title: 'Success',
        description: 'Job posted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to post job',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="mt-1"
          placeholder="e.g., Full Stack Developer Needed"
        />
        {errors.title && (
          <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className="mt-1"
          placeholder="Describe the job requirements and expectations..."
          rows={4}
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
          {...register('budget', {
            required: 'Budget is required',
            min: { value: 1, message: 'Budget must be greater than 0' }
          })}
          className="mt-1"
          placeholder="1000"
        />
        {errors.budget && (
          <p className="text-sm text-destructive mt-1">{errors.budget.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="skills">Required Skills</Label>
        <Input
          id="skills"
          {...register('skills', { required: 'Skills are required' })}
          className="mt-1"
          placeholder="React, TypeScript, Node.js"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Separate skills with commas
        </p>
        {errors.skills && (
          <p className="text-sm text-destructive mt-1">{errors.skills.message}</p>
        )}
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        Post Job
      </Button>
    </form>
  );
}