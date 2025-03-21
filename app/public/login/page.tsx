'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/atoms/Button';
import { Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const { connectWallet, isLoading } = useAuth();
  const router = useRouter();

  const handleConnect = async () => {
    await connectWallet();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary">
      <div className="max-w-md w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to WorkChain</h1>
          <p className="text-muted-foreground">
            Connect your wallet to access the decentralized freelance platform
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-lg">
          <Button
            onClick={handleConnect}
            loading={isLoading}
            className="w-full"
            size="lg"
          >
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>By connecting your wallet, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}