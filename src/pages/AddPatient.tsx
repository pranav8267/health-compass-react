
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  department: string;
}

export default function AddPatient() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    date: new Date().toISOString().split('T')[0],
    doctor: '',
    department: '',
    diagnosis: '',
    prescription: '',
    phone: '',
    billing: ''
  });

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // Sample doctors data
    const sampleDoctors = [
      { id: '1', name: 'Dr. James Wilson', department: 'Cardiology' },
      { id: '2', name: 'Dr. Sarah Johnson', department: 'Neurology' },
      { id: '3', name: 'Dr. Michael Chen', department: 'Pediatrics' },
      { id: '4', name: 'Dr. Emily Rodriguez', department: 'Psychology' }
    ];
    
    const sampleDepartments = [
      'Cardiology',
      'Neurology',
      'Pediatrics',
      'Psychology',
      'Dermatology',
      'General Medicine'
    ];
    
    setDoctors(sampleDoctors);
    setDepartments(sampleDepartments);
    
    // Check if there's a selected department in localStorage
    const savedDepartment = localStorage.getItem('selectedDepartment');
    if (savedDepartment) {
      setNewPatient(prev => ({ ...prev, department: savedDepartment }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleSelectChange = (value: string, field: string) => {
    setNewPatient({ ...newPatient, [field]: value });
    
    // If department is selected, filter doctors by department
    if (field === 'department') {
      // Set doctor to empty when department changes
      setNewPatient(prev => ({ ...prev, doctor: '', department: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    // For now, we'll just show a success toast and navigate back
    
    toast({
      title: "Patient Added",
      description: `${newPatient.name} has been successfully added to the system.`,
    });
    
    // Navigate back to patients page
    navigate('/patients');
  };

  // Filter doctors by selected department
  const filteredDoctors = newPatient.department
    ? doctors.filter(doctor => doctor.department === newPatient.department)
    : doctors;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/patients')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Patient</h1>
            <p className="text-muted-foreground">Register a new patient in the hospital system</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>Enter the details of the new patient.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newPatient.name}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={newPatient.age}
                    onChange={handleInputChange}
                    placeholder="35"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange(value, 'gender')}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newPatient.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange(value, 'department')}
                    value={newPatient.department}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="doctor">Assign Doctor</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange(value, 'doctor')}
                    disabled={!newPatient.department}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        !newPatient.department 
                          ? "Select a department first" 
                          : "Select doctor"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDoctors.map(doctor => (
                        <SelectItem key={doctor.id} value={doctor.name}>{doctor.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newPatient.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Textarea
                    id="diagnosis"
                    name="diagnosis"
                    value={newPatient.diagnosis}
                    onChange={handleInputChange}
                    placeholder="Initial diagnosis"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prescription">Prescription</Label>
                  <Textarea
                    id="prescription"
                    name="prescription"
                    value={newPatient.prescription}
                    onChange={handleInputChange}
                    placeholder="Prescribed medications"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billing">Billing Amount</Label>
                <Input
                  id="billing"
                  name="billing"
                  value={newPatient.billing}
                  onChange={handleInputChange}
                  placeholder="$150.00"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/patients')}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-medical hover:bg-medical-dark">
                  Add Patient
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
