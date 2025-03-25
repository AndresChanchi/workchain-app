'use client';

import { Contract } from '@/core/contracts/ContractValidator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/atoms/Button';
import { formatDistanceToNow } from 'date-fns';
import { RoleManager } from '@/core/users/RoleManager';

interface JobCardProps {
  contract: Contract;
  onApply?: () => void;
}

export function JobCard({ contract, onApply }: JobCardProps) {
  const { user } = useAuth();

  const canApply = user && RoleManager.canApplyToContract(user.role) && contract.status === 'open';

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{contract.title}</CardTitle>
          <Badge variant={contract.status === 'open' ? 'default' : 'secondary'}>
            {contract.status}
          </Badge>
        </div>
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
          <span>Posted {formatDistanceToNow(contract.createdAt)} ago</span>
        </div>
      </CardContent>
      {canApply && (
        <CardFooter>
          <Button onClick={onApply} className="w-full">
            Apply Now
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}