import { Core } from '@walletconnect/core';
import { WalletKit } from '@reown/walletkit';

const core = new Core({
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '8275ae9f949100a9190c9c1bb6fc5e76',
});

const metadata = {
  name: 'Workchain',
  description: 'AppKit Example',
  url: 'http://localhost:3000', // Asegúrate de que coincida con tu dominio
  icons: ['https://assets.reown.com/reown-profile-pic.png'],
};

export const walletKit = await WalletKit.init({
  core,
  metadata,
});
