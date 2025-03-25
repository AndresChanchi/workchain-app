import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

// Hardcodea tu projectId (para testing; en producción, usa variables de entorno)
export const config = getDefaultConfig({
  appName: 'WorkChain',
  projectId: '8275ae9f949100a9190c9c1bb6fc5e76',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    // Activa sepolia solo si lo requieres:
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});
