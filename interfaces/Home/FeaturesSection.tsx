'use client';

import { Shield, Zap, Globe, Clock, Sparkles } from 'lucide-react';

const features = [
  {
    name: 'Secure Payments',
    description: 'Smart contracts ensure automatic and secure payments for completed work with escrow protection.',
    icon: Shield,
  },
  {
    name: 'No Middlemen',
    description: 'Direct peer-to-peer connections eliminate unnecessary fees and bureaucracy.',
    icon: Zap,
  },
  {
    name: 'Global Talent',
    description: 'Access a worldwide network of top professionals and exciting projects without borders.',
    icon: Globe,
  },
  {
    name: 'Fast Transactions',
    description: 'Blockchain technology enables near-instant payments and contract execution.',
    icon: Clock,
  },
  // Si quieres mantener solo 4, elimina esta quinta feature
  {
    name: 'Reputation System',
    description: 'Decentralized ratings ensure transparent and trustworthy collaborations.',
    icon: Sparkles,
  }
];

export function FeaturesSection() {
  return (
    <div className="pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{feature.name}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}