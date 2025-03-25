export interface Negotiation {
  id: string;
  offerTitle: string;
  description: string;
  budget: number;
  status: 'pending' | 'accepted' | 'rejected';
  proposalMessage?: string;
  expectedDuration?: string;
  employerAddress: string;
  freelancerAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export const mockNegotiations: Negotiation[] = [
  {
    id: '1',
    offerTitle: 'Smart Contract Development',
    description: 'Develop a secure and efficient smart contract for our DeFi protocol',
    budget: 10000,
    status: 'pending',
    proposalMessage: 'I can complete this project in 3 weeks with daily updates',
    expectedDuration: '3 weeks',
    employerAddress: '0x1234...5678',
    freelancerAddress: '0xabcd...efgh',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    offerTitle: 'Frontend Development',
    description: 'Build a responsive dashboard for our DApp',
    budget: 5000,
    status: 'accepted',
    proposalMessage: 'I can deliver this with the specified features',
    expectedDuration: '2 weeks',
    employerAddress: '0x8765...4321',
    freelancerAddress: '0xijkl...mnop',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];