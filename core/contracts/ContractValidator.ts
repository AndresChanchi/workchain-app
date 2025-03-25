/**
 * Validates contract terms and conditions
 */
export interface Contract {
  id: string;
  title: string;
  description: string;
  budget: number;
  skills: string[];
  status: 'draft' | 'open' | 'in_progress' | 'completed';
  employerAddress: string;
  freelancerAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ContractValidator {
  static validateBudget(budget: number): boolean {
    return budget > 0;
  }

  static validateSkills(skills: string[]): boolean {
    return skills.length > 0 && skills.every(skill => skill.trim().length > 0);
  }

  static validateContract(contract: Partial<Contract>): string[] {
    const errors: string[] = [];

    if (!contract.title?.trim()) {
      errors.push('Title is required');
    }

    if (!contract.description?.trim()) {
      errors.push('Description is required');
    }

    if (!this.validateBudget(contract.budget!)) {
      errors.push('Budget must be greater than 0');
    }

    if (!contract.skills || !this.validateSkills(contract.skills)) {
      errors.push('At least one skill is required');
    }

    return errors;
  }
}