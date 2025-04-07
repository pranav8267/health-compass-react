
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  
  useEffect(() => {
    const savedDepartment = localStorage.getItem('selectedDepartment');
    if (savedDepartment) {
      setSelectedDepartment(savedDepartment);
    }
  }, []);
  
  // Sample patients data
  const patients: Patient[] = [
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
    {
      id: 'P1005',
      name: 'David Johnson',
      age: 52,
      gender: 'Male',
      date: '2024-04-05',
      doctor: 'Dr. James Wilson',
      diagnosis: 'Type 2 Diabetes',
      prescription: 'Metformin 500mg',
      phone: '(555) 234-5678',
      billing: '$185.00',
      department: 'Cardiology'
    },
    {
      id: 'P1006',
      name: 'Jennifer Lee',
      age: 28,
      gender: 'Female',
      date: '2024-04-05',
      doctor: 'Dr. Emily Rodriguez',
      diagnosis: 'Depression',
      prescription: 'Sertraline 50mg',
      phone: '(555) 876-5432',
      billing: '$165.75',
      department: 'Psychology'
    },
    {
      id: 'P1007',
      name: 'Robert Garcia',
      age: 41,
      gender: 'Male',
      date: '2024-04-05',
      doctor: 'Dr. Michael Chen',
      diagnosis: 'Bronchitis',
      prescription: 'Amoxicillin 500mg',
      phone: '(555) 345-6789',
      billing: '$155.50',
      department: 'Pediatrics'
    },
    {
      id: 'P1008',
      name: 'Lisa Wong',
      age: 35,
      gender: 'Female',
      date: '2024-04-06',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Vertigo',
      prescription: 'Meclizine 25mg',
      phone: '(555) 654-3210',
      billing: '$120.00',
      department: 'Neurology'
    },
  ];

  // First filter by search term
  const searchFiltered = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Then filter by department if selected
  const filteredPatients = selectedDepartment
    ? searchFiltered.filter(patient => patient.department.toLowerCase() === selectedDepartment.toLowerCase())
    : searchFiltered;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Patients</h1>
          <p className="text-muted-foreground">
            {selectedDepartment 
              ? `Showing patients in ${selectedDepartment} department` 
              : "View and manage patient records"}
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="relative w-full md:w-auto flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  className="pl-9 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {filteredPatients.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No patients found matching your criteria.</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Patient ID</TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Age/Gender</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Doctor</TableHead>
                      <TableHead className="font-semibold">Department</TableHead>
                      <TableHead className="font-semibold">Diagnosis</TableHead>
                      <TableHead className="font-semibold">Prescription</TableHead>
                      <TableHead className="font-semibold">Contact</TableHead>
                      <TableHead className="font-semibold text-right">Billing</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id}</TableCell>
                        <TableCell>{patient.name}</TableCell>
                        <TableCell>{patient.age} / {patient.gender}</TableCell>
                        <TableCell>{new Date(patient.date).toLocaleDateString()}</TableCell>
                        <TableCell>{patient.doctor}</TableCell>
                        <TableCell>{patient.department}</TableCell>
                        <TableCell>{patient.diagnosis}</TableCell>
                        <TableCell>{patient.prescription}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell className="text-right">{patient.billing}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
