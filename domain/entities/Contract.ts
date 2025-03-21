export interface Contract {
  id: string;
  title: string;
  description: string;
  budget: number;
  employerAddress: string;
  freelancerAddress?: string;
  status: 'open' | 'in_progress' | 'completed';
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateContractDTO {
  title: string;
  description: string;
  budget: number;
  skills: string[];
}