export interface JobPosting {
  id: string;
  title: string;
  description: string;
  budget: number;
  employerPseudonym: string;
  status: "open" | "in-progress" | "completed";
  skills: string[];
  createdAt: string;
}

export const mockJobs: JobPosting[] = [
  {
    id: "1",
    title: "Smart Contract Audit",
    description: "Need comprehensive security review for our DeFi protocol. Looking for an experienced auditor to perform a thorough code review and vulnerability assessment.",
    budget: 8000,
    employerPseudonym: "DeFiBuilder#Z9X8",
    status: "open",
    skills: ["Solidity", "Security", "Smart Contracts"],
    createdAt: "2024-06-01T09:30:00Z"
  },
  {
    id: "2",
    title: "Frontend for NFT Marketplace",
    description: "Build responsive Next.js frontend with wallet integration. Must have experience with Web3 and modern React practices.",
    budget: 4500,
    employerPseudonym: "NFTCreator#Y4W2",
    status: "open",
    skills: ["Next.js", "Tailwind", "Web3.js"],
    createdAt: "2024-06-05T14:15:00Z"
  },
  {
    id: "3",
    title: "DAO Governance Implementation",
    description: "Implement governance mechanisms for our DAO platform. Includes voting systems and proposal management.",
    budget: 12000,
    employerPseudonym: "DAOmaster#K7L9",
    status: "in-progress",
    skills: ["Solidity", "TypeScript", "Governance"],
    createdAt: "2024-06-03T11:20:00Z"
  },
  {
    id: "4",
    title: "DeFi Analytics Dashboard",
    description: "Create a real-time analytics dashboard for DeFi protocols. Must include charts and performance metrics.",
    budget: 6000,
    employerPseudonym: "DataWizard#M2N4",
    status: "completed",
    skills: ["React", "D3.js", "API Integration"],
    createdAt: "2024-06-02T16:45:00Z"
  }
];