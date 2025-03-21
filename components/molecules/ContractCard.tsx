'use client';

import { Contract } from '@/domain/entities/Contract';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/atoms/Button';
import { formatDistanceToNow } from 'date-fns';

interface ContractCardProps {
  contract: Contract;
  onApply?: () => void;
  isFreelancer?: boolean;
}

export function ContractCard({ contract, onApply, isFreelancer }: ContractCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{contract.title}</span>
          <Badge variant={contract.status === 'open' ? 'default' : 'secondary'}>
            {contract.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{contract.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {contract.skills.map((skill) => (
            <Badge key={skill} variant="outline">{skill}</Badge>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Budget: ${contract.budget}</span>
          <span>Posted {formatDistanceToNow(new Date(contract.createdAt))} ago</span>
        </div>
      </CardContent>
      {isFreelancer && contract.status === 'open' && (
        <CardFooter>
          <Button onClick={onApply} className="w-full">
            Apply for Contract
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}