/**
 * Manages user roles and permissions
 */
export class RoleManager {
  static canCreateContract(role: string): boolean {
    return role === 'employer';
  }

  static canApplyToContract(role: string): boolean {
    return role === 'freelancer';
  }

  static getAvailableActions(role: string): string[] {
    switch (role) {
      case 'employer':
        return ['create_contract', 'view_applications', 'hire_freelancer'];
      case 'freelancer':
        return ['apply_to_contract', 'view_contracts', 'submit_work'];
      default:
        return [];
    }
  }
}