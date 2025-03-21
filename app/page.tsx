import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            The Future of Freelancing is{' '}
            <span className="text-primary">Decentralized</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect, collaborate, and create with WorkChain - the next generation
            freelance platform powered by blockchain technology.
          </p>
          <Link href="/login">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
            <p className="text-muted-foreground">
              Smart contracts ensure automatic and secure payments for completed work.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">No Middlemen</h3>
            <p className="text-muted-foreground">
              Direct connections between clients and freelancers, reducing fees.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Global Opportunities</h3>
            <p className="text-muted-foreground">
              Access a worldwide network of talent and projects without borders.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}