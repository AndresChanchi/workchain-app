import { Contract, CreateContractDTO } from '@/domain/entities/Contract';

const MOCK_DELAY = 1000;

const mockContracts: Contract[] = [
  {
    id: '1',
    title: 'Build DeFi Dashboard',
    description: 'Create a responsive dashboard for DeFi protocol analytics',
    budget: 5000,
    employerAddress: '0x1234...5678',
    status: 'open',
    skills: ['React', 'TypeScript', 'Web3'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock contracts as needed
];

export async function fetchContracts(): Promise<Contract[]> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  return mockContracts;
}

export async function createContract(data: CreateContractDTO): Promise<Contract> {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  const newContract: Contract = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    employerAddress: '0x' + Math.random().toString(16).slice(2, 42),
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockContracts.push(newContract);
  return newContract;
}