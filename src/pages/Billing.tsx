import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

export default function Billing() {
  const navigate = useNavigate();
  
  const handleAddBilling = () => {
    navigate('/add-billing');
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
            <p className="text-muted-foreground">Manage patient billing and payments</p>
          </div>
          
          <Button 
            className="bg-medical hover:bg-medical-dark"
            onClick={handleAddBilling}
          >
            <FileText className="mr-2 h-4 w-4" />
            Make a Billing
          </Button>
        </div>

        {/* Your existing billing content goes here */}
      </div>
    </Layout>
  );
}
