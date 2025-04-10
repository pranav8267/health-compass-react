
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Receipt } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  date: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
  phone: string;
  billing: string;
  department: string;
}

export default function PatientDetails() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the patient details from your API
    // For now, we'll use sample data
    const fetchPatient = () => {
      const samplePatients: Patient[] = [
        {
          id: 'P1001',
          name: 'John Smith',
          age: 45,
          gender: 'Male',
          date: '2024-04-02',
          doctor: 'Dr. James Wilson',
          diagnosis: 'Hypertension',
          prescription: 'Lisinopril 10mg',
          phone: '(555) 123-4567',
          billing: '$145.00',
          department: 'Cardiology'
        },
        {
          id: 'P1002',
          name: 'Emily Jones',
          age: 32,
          gender: 'Female',
          date: '2024-04-03',
          doctor: 'Dr. Sarah Johnson',
          diagnosis: 'Migraine',
          prescription: 'Sumatriptan 50mg',
          phone: '(555) 987-6543',
          billing: '$210.50',
          department: 'Neurology'
        },
        {
          id: 'P1003',
          name: 'Michael Brown',
          age: 8,
          gender: 'Male',
          date: '2024-04-04',
          doctor: 'Dr. Michael Chen',
          diagnosis: 'Common Cold',
          prescription: 'Paracetamol Syrup',
          phone: '(555) 456-7890',
          billing: '$95.00',
          department: 'Pediatrics'
        },
        {
          id: 'P1004',
          name: 'Sarah Wilson',
          age: 65,
          gender: 'Female',
          date: '2024-04-04',
          doctor: 'Dr. Emily Rodriguez',
          diagnosis: 'Anxiety',
          prescription: 'Sertraline 25mg',
          phone: '(555) 789-0123',
          billing: '$175.25',
          department: 'Psychology'
        },
      ];

      const foundPatient = samplePatients.find(p => p.id === patientId);
      setPatient(foundPatient || null);
      setLoading(false);
    };

    fetchPatient();
  }, [patientId]);

  const handleEdit = () => {
    // In a real app, you would navigate to an edit page
    toast({
      title: "Edit Patient",
      description: "This functionality is not implemented yet.",
    });
  };

  const handleDelete = () => {
    // In a real app, you would delete the patient from your backend
    toast({
      title: "Patient Removed",
      description: "The patient has been successfully removed from the system.",
    });
    navigate('/patients');
  };

  const handleCreateBilling = () => {
    navigate('/add-billing', { state: { patientId } });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[70vh]">
          <p>Loading patient details...</p>
        </div>
      </Layout>
    );
  }

  if (!patient) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[70vh]">
          <p>Patient not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/patients')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{patient.name}</h1>
            <p className="text-muted-foreground">Patient ID: {patient.id} • {patient.department}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleEdit}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Age</h3>
                    <p className="text-base">{patient.age} years</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Gender</h3>
                    <p className="text-base">{patient.gender}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Visit Date</h3>
                    <p className="text-base">{new Date(patient.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p className="text-base">{patient.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                    <p className="text-base">{patient.department}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Assigned Doctor</h3>
                    <p className="text-base">{patient.doctor}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Diagnosis</h3>
                  <p className="text-base p-3 bg-muted rounded-md">{patient.diagnosis}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Prescription</h3>
                  <p className="text-base p-3 bg-muted rounded-md">{patient.prescription}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Current Bill</h3>
                  <p className="text-xl font-bold">{patient.billing}</p>
                </div>
                
                <Button 
                  className="w-full bg-medical hover:bg-medical-dark"
                  onClick={handleCreateBilling}
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  Create New Billing
                </Button>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Billing History</h3>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between py-2">
                      <span>{new Date(patient.date).toLocaleDateString()}</span>
                      <span>{patient.billing}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
