
import { ReactNode, useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const location = useLocation();
  const { toast } = useToast();

  // Check if route needs protection (Accounts or Communication)
  const needsProtection = 
    location.pathname === '/accounts' || 
    location.pathname === '/communication';

  // If not a protected route, just render children
  if (!needsProtection) {
    return <>{children}</>;
  }

  const handleAuthorize = () => {
    // Simple password check - in a real app, you'd use a more secure method
    if (password === 'admin123') {
      setIsAuthorized(true);
      setIsDialogOpen(false);
      toast({
        title: "Access granted",
        description: "You now have access to this secure section",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "Incorrect password. Please try again.",
      });
    }
  };

  if (!isAuthorized) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>
              This is a secure section of the HMS. Please enter the password to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAuthorize();
                }
              }}
              autoComplete="current-password"
            />
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => <Navigate to="/dashboard" replace />}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAuthorize}>
              Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return <>{children}</>;
}
