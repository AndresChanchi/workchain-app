'use client';

import { useAccount } from 'wagmi';
import { redirect } from 'next/navigation';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useAccount();
  
  if (!isConnected) {
    redirect('/home'); // <--- Redirige sin useEffect
  }

  return <div className="min-h-screen bg-background">{children}</div>;
}