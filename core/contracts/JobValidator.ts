export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  skills: string[];
  deadline?: Date;
}

export const validateJobBudget = (budget: number): boolean => {
  return budget >= 100;
};

export const validateJob = (job: Job): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!job.title || job.title.trim().length < 5) {
    errors.push('Title must be at least 5 characters long');
  }

  if (!job.description || job.description.trim().length < 20) {
    errors.push('Description must be at least 20 characters long');
  }

  if (!validateJobBudget(job.budget)) {
    errors.push('Budget must be at least $100');
  }

  if (!job.skills || job.skills.length === 0) {
    errors.push('At least one skill is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};