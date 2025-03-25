'use client';

import { Negotiation } from '@/infrastructure/api/mockNegotiations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface NegotiationCardProps {
  negotiation: Negotiation;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export function NegotiationCard({ negotiation }: NegotiationCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">
            {negotiation.offerTitle}
          </CardTitle>
          <Badge variant={negotiation.status === 'accepted' ? 'default' : 'secondary'}>
            {negotiation.status.charAt(0).toUpperCase() + negotiation.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-muted-foreground">{negotiation.description}</p>
        </div>

        <div className="flex justify-between items-center py-2 border-t border-b">
          <div>
            <p className="text-sm text-muted-foreground">Budget</p>
            <p className="text-2xl font-bold">${negotiation.budget.toLocaleString()}</p>
          </div>
          {negotiation.expectedDuration && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{negotiation.expectedDuration}</p>
            </div>
          )}
        </div>

        {negotiation.proposalMessage && (
          <div>
            <h4 className="font-medium mb-2">Proposal</h4>
            <p className="text-muted-foreground">{negotiation.proposalMessage}</p>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          Created {formatDistanceToNow(new Date(negotiation.createdAt), { addSuffix: true })}
        </div>
      </CardContent>
    </Card>
  );
}