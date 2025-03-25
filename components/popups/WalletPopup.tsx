'use client';

import * as React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { cn } from '@/lib/utils';

export function WalletPopup() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        if (!mounted) return null;

        if (account && chain) {
          return (
            <button
              onClick={() => {
                // Aquí podrías abrir un modal con más opciones o simplemente mostrar estado.
              }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-200'
              )}
            >
              <span className="text-black font-medium text-sm">Wallet Connected</span>
            </button>
          );
        }

        return (
          <button
            onClick={openConnectModal}
            className={cn(
              'flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-400 hover:to-amber-500 active:scale-95 transition-all duration-200 shadow-lg shadow-amber-500/20'
            )}
          >
            <img
              src="https://img.icons8.com/fluency/48/000000/wallet.png"
              alt="Wallet"
              width={24}
              height={24}
              className="h-5 w-5"
            />
            <span className="text-black font-medium text-sm">Connect Wallet</span>
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
