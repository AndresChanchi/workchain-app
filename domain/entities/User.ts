export interface User {
  address: string;
  role: 'employer' | 'freelancer';
  reputation?: number;
  completedContracts?: number;
  skills?: string[];
  bio?: string;
}