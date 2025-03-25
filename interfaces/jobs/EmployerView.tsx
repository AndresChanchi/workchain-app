'use client';

import { useState } from 'react';
import { mockJobs, Job } from '@/infrastructure/api/mockJobs';
import { JobCard } from './JobCard';
import { JobForm } from './JobForm';
import { Plus } from 'lucide-react';

export function EmployerView() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleCreateJob = (newJob: Job) => {
    setJobs([newJob, ...jobs]);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Posted Jobs</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Post New Job
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <JobForm onSubmit={handleCreateJob} onCancel={() => setIsFormOpen(false)} />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}