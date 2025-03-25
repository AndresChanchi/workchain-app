/**
 * Calculates contract payments and platform fees
 */
export class PaymentCalculator {
  private static PLATFORM_FEE_PERCENTAGE = 0.05; // 5% platform fee

  static calculatePlatformFee(amount: number): number {
    return amount * this.PLATFORM_FEE_PERCENTAGE;
  }

  static calculateFreelancerPayout(contractAmount: number): number {
    const platformFee = this.calculatePlatformFee(contractAmount);
    return contractAmount - platformFee;
  }

  static calculateTotalCost(baseAmount: number): number {
    const platformFee = this.calculatePlatformFee(baseAmount);
    return baseAmount + platformFee;
  }
}