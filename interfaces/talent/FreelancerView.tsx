'use client';

import { useState } from 'react';
import { mockJobs, Job } from '@/infrastructure/api/mockJobs';
import { JobCard } from '@/interfaces/jobs/JobCard';

export function FreelancerView() {
  const [availableJobs] = useState<Job[]>(mockJobs);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

  const handleApply = (job: Job) => {
    setAppliedJobs([...appliedJobs, job]);
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={() => handleApply(job)}
              showApplyButton={!appliedJobs.some(j => j.id === job.id)}
            />
          ))}
        </div>
      </section>

      {appliedJobs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Applied Jobs</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appliedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                showApplyButton={false}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}