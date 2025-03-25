'use client';

import { Button } from '@/components/atoms/Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useRole } from '@/core/users/useRole';

export function HeroSection() {
  const { isConnected } = useAccount();
  const { role } = useRole();

  return (
    <div className="relative overflow-hidden bg-background pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-800">
            The Future of Work is Decentralized
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Connect directly with top talent or find your next project on WorkChain.
            Smart contracts ensure secure payments and transparent agreements.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            {isConnected ? (
              <Link href={role === 'employer' ? '/employer-dashboard' : '/freelancer-dashboard'}>
                <Button size="lg">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/find-talent">
                  <Button 
                    size="lg" 
                    variant="default"
                    className="bg-gray-900 text-white hover:bg-amber-500 hover:text-gray-900 active:bg-amber-600 active:text-gray-900 transition-colors duration-200"
                  >
                    Hire Talent
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/find-work">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-gray-900 text-gray-900 hover:bg-amber-100 hover:border-amber-500 active:bg-amber-200 active:border-amber-600 transition-colors duration-200"
                  >
                    Find Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
