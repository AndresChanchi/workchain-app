export interface TalentProfile {
  address: string;
  pseudonym: string;
  skills: string[];
  rating: number;
  completedJobs: number;
  hourlyRate: number;
}

export const mockTalents: TalentProfile[] = [
  {
    address: "0x1a2b3c4d5e6f7g8h9i0j",
    pseudonym: "SolidityWizard#X9Z8",
    skills: ["Smart Contracts", "Solidity", "DeFi", "React"],
    rating: 4.9,
    completedJobs: 42,
    hourlyRate: 150
  },
  {
    address: "0x9i8h7g6f5e4d3c2b1a0",
    pseudonym: "Web3Designer#K2M4",
    skills: ["UI/UX", "Figma", "Web Design", "TypeScript"],
    rating: 4.7,
    completedJobs: 28,
    hourlyRate: 95
  },
  {
    address: "0x2b3c4d5e6f7g8h9i0j1a",
    pseudonym: "TheWorst#P7R9",
    skills: ["Rust", "IA", "Avalanche", "Zero Knowledge", "Scream Architecture"],
    rating: 4.8,
    completedJobs: 325,
    hourlyRate: 500
  },
  {
    address: "0x1hhklj3432l31432141afsd1",
    pseudonym: "Thebest#P7R9",
    skills: ["React", "SalesForce", "Descentralized CRM"],
    rating: 3.0,
    completedJobs: 22,
    hourlyRate: 30
  },  
  {
    address: "0x3441236bbsd4d5e6f7g8h9i0j1a",
    pseudonym: "DappDev#P7R9",
    skills: ["Coffe.cpp", "TeamWork", "Agents", "Python"],
    rating: 2.8,
    completedJobs: 35,
    hourlyRate: 120
  },
  {
    address: "0x6f7g8h9i0jjkasdji11a",
    pseudonym: "Krato#P7R9",
    skills: ["React", "Node.js", "Web3.js", "TypeScript"],
    rating: 4.0,
    completedJobs: 35,
    hourlyRate: 20
  }
];