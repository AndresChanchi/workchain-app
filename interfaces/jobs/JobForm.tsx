'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Job } from '@/infrastructure/api/mockJobs';
import { validateJob } from '@/core/contracts/JobValidator';
import { X } from 'lucide-react';
import { generatePseudonym } from '@/core/users/PseudonymGenerator';

interface JobFormProps {
  onSubmit: (job: Job) => void;
  onCancel: () => void;
}

export function JobForm({ onSubmit, onCancel }: JobFormProps) {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    skills: [] as string[],
    currentSkill: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const jobData = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description,
      budget: Number(formData.budget),
      skills: formData.skills,
      employerPseudonym: generatePseudonym(address || ''),
      status: 'open' as const,
      createdAt: new Date().toISOString()
    };

    const validation = validateJob(jobData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(jobData);
  };

  const addSkill = () => {
    if (formData.currentSkill.trim() && !formData.skills.includes(formData.currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.currentSkill.trim()],
        currentSkill: ''
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Job Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          placeholder="e.g., Smart Contract Developer Needed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          rows={4}
          placeholder="Describe the job requirements and expectations..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Budget (USD)
        </label>
        <input
          type="number"
          value={formData.budget}
          onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          placeholder="1000"
          min="100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Required Skills
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.currentSkill}
            onChange={(e) => setFormData(prev => ({ ...prev, currentSkill: e.target.value }))}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Add a skill (e.g., Solidity)"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center gap-2 dark:bg-gray-700 dark:text-gray-300"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg dark:bg-red-900/50 dark:text-red-300">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Job
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}