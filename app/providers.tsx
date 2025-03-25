'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit';
import { arbitrumSepolia } from 'wagmi/chains';
import { createConfig } from 'wagmi';  // Asegúrate de importar createConfig

// Definir las chains correctamente
const chains = [
  {
    ...arbitrumSepolia,
    blockExplorers: {
      default: {
        name: 'Arbiscan',
        url: 'https://sepolia.arbiscan.io',
        apiUrl: 'https://api-sepolia.arbiscan.io/api',
      },
    },
    contracts: {
      ensRegistry: { address: '0x0000000000000000000000000000000000000000' },
      ensUniversalResolver: { address: '0x0000000000000000000000000000000000000000' },
      multicall3: { address: '0x0000000000000000000000000000000000000000' },
    },
  },
];

// Obtener los conectores predeterminados de RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'WorkChain',
  projectId: '8275ae9f949100a9190c9c1bb6fc5e76',  // Asegúrate de poner el projectId correcto
  chains,
});

// Crear la configuración de Wagmi
const wagmiConfig = createConfig({
  chains,  // Aquí agregamos las chains completas
  connectors,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          chains={chains}  // Aquí pasamos las chains a RainbowKitProvider
          theme={lightTheme({
            borderRadius: 'medium',
            overlayBlur: 'small',
          })}
          appInfo={{
            appName: 'WorkChain',
            learnMoreUrl: '',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
