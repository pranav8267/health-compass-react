
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  department: string;
  doctor: string;
}

export default function AddBilling() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const preselectedPatientId = location.state?.patientId || '';
  
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<{ id: string, name: string }[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  
  const [billing, setBilling] = useState({
    patientId: preselectedPatientId,
    patientName: '',
    doctor: '',
    department: '',
    date: new Date().toISOString().split('T')[0],
    billAmount: '',
    billType: '',
    paymentMethod: '',
    description: '',
    tax: '',
    discount: '',
    totalAmount: ''
  });

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const samplePatients = [
      { id: 'P1001', name: 'John Smith', department: 'Cardiology', doctor: 'Dr. James Wilson' },
      { id: 'P1002', name: 'Emily Jones', department: 'Neurology', doctor: 'Dr. Sarah Johnson' },
      { id: 'P1003', name: 'Michael Brown', department: 'Pediatrics', doctor: 'Dr. Michael Chen' },
      { id: 'P1004', name: 'Sarah Wilson', department: 'Psychology', doctor: 'Dr. Emily Rodriguez' }
    ];
    
    const sampleDoctors = [
      { id: '1', name: 'Dr. James Wilson' },
      { id: '2', name: 'Dr. Sarah Johnson' },
      { id: '3', name: 'Dr. Michael Chen' },
      { id: '4', name: 'Dr. Emily Rodriguez' }
    ];
    
    const sampleDepartments = [
      'Cardiology',
      'Neurology',
      'Pediatrics',
      'Psychology',
      'Dermatology',
      'General Medicine'
    ];
    
    setPatients(samplePatients);
    setDoctors(sampleDoctors);
    setDepartments(sampleDepartments);
    
    // If there's a preselected patient, set patient details
    if (preselectedPatientId) {
      const selectedPatient = samplePatients.find(p => p.id === preselectedPatientId);
      if (selectedPatient) {
        setBilling(prev => ({
          ...prev,
          patientName: selectedPatient.name,
          doctor: selectedPatient.doctor,
          department: selectedPatient.department
        }));
      }
    }
  }, [preselectedPatientId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
    
    // Auto-calculate total amount if bill amount, tax, or discount changes
    if (name === 'billAmount' || name === 'tax' || name === 'discount') {
      calculateTotalAmount(
        name === 'billAmount' ? value : billing.billAmount,
        name === 'tax' ? value : billing.tax,
        name === 'discount' ? value : billing.discount
      );
    }
  };

  const handleSelectChange = (value: string, field: string) => {
    setBilling({ ...billing, [field]: value });
    
    // If patient is selected, set department and doctor
    if (field === 'patientId') {
      const selectedPatient = patients.find(p => p.id === value);
      if (selectedPatient) {
        setBilling(prev => ({
          ...prev,
          patientName: selectedPatient.name,
          doctor: selectedPatient.doctor,
          department: selectedPatient.department
        }));
      }
    }
  };

  const calculateTotalAmount = (amount: string, tax: string, discount: string) => {
    const billAmount = parseFloat(amount) || 0;
    const taxAmount = billAmount * (parseFloat(tax) || 0) / 100;
    const discountAmount = billAmount * (parseFloat(discount) || 0) / 100;
    const total = (billAmount + taxAmount - discountAmount).toFixed(2);
    
    setBilling(prev => ({ ...prev, totalAmount: total }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    // For now, we'll just show a success toast and navigate back
    
    toast({
      title: "Billing Created",
      description: `Billing of ${billing.totalAmount} created for ${billing.patientName}.`,
    });
    
    // Navigate back to billing page
    navigate('/billing');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/billing')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Billing</h1>
            <p className="text-muted-foreground">Generate a new bill for patient services</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Billing Details</CardTitle>
            <CardDescription>Enter the billing information for the patient.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange(value, 'patientId')}
                    value={billing.patientId}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.id} - {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    name="patientName"
                    value={billing.patientName}
                    onChange={handleInputChange}
                    disabled={true}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    value={billing.department}
                    onChange={handleInputChange}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Input
                    id="doctor"
                    name="doctor"
                    value={billing.doctor}
                    onChange={handleInputChange}
                    disabled={true}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Bill Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={billing.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billType">Bill Type</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange(value, 'billType')}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bill type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultation">Consultation</SelectItem>
                      <SelectItem value="Procedure">Procedure</SelectItem>
                      <SelectItem value="Laboratory">Laboratory</SelectItem>
                      <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="Radiology">Radiology</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Bill Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={billing.description}
                  onChange={handleInputChange}
                  placeholder="Detailed description of services provided"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="billAmount">Bill Amount ($)</Label>
                  <Input
                    id="billAmount"
                    name="billAmount"
                    type="number"
                    step="0.01"
                    value={billing.billAmount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax">Tax (%)</Label>
                  <Input
                    id="tax"
                    name="tax"
                    type="number"
                    step="0.01"
                    value={billing.tax}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    step="0.01"
                    value={billing.discount}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange(value, 'paymentMethod')}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Debit Card">Debit Card</SelectItem>
                      <SelectItem value="Insurance">Insurance</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Total Amount ($)</Label>
                  <Input
                    id="totalAmount"
                    name="totalAmount"
                    value={billing.totalAmount}
                    disabled
                    className="font-bold"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/billing')}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-medical hover:bg-medical-dark">
                  Create Billing
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
