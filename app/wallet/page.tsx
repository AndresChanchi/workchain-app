'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';

export default function WalletPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center bg-background pt-16 md:pt-12">
      <div className="max-w-md w-full px-4">
        {/* Título de bienvenida con hover */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome to the Web3 Freelance hub
        </h1>

        {/* Área del ConnectButton */}
        <div className="mb-8 flex justify-center items-center p-0 transform transition-all duration-300 ease-in-out hover:scale-105 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-red-500">
          <ConnectButton accountStatus="address" chainStatus="icon" showBalance={false} />
        </div>

        {/* Botón para volver atrás */}
        <div className="flex justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-all duration-200"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}