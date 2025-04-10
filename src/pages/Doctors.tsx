
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  email: string;
  phone: string;
  availability: string;
  image: string;
  department: string;
}

export default function Doctors() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  
  useEffect(() => {
    const savedDepartment = localStorage.getItem('selectedDepartment');
    if (savedDepartment) {
      setSelectedDepartment(savedDepartment);
      console.log('Loading selected department:', savedDepartment);
    }
  }, []);

  // Sample doctors data
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. James Wilson',
      specialty: 'Cardiology',
      experience: '12 years',
      email: 'james.wilson@hospital.com',
      phone: '(555) 123-4567',
      availability: 'Mon, Wed, Fri',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
      department: 'Cardiology'
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      specialty: 'Neurology',
      experience: '8 years',
      email: 'sarah.johnson@hospital.com',
      phone: '(555) 987-6543',
      availability: 'Tue, Thu',
      image: 'https://randomuser.me/api/portraits/women/64.jpg',
      department: 'Neurology'
    },
    {
      id: '3',
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrics',
      experience: '10 years',
      email: 'michael.chen@hospital.com',
      phone: '(555) 456-7890',
      availability: 'Mon-Fri',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      department: 'Pediatrics'
    },
    {
      id: '4',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Psychology',
      experience: '6 years',
      email: 'emily.rodriguez@hospital.com',
      phone: '(555) 789-0123',
      availability: 'Wed, Thu, Fri',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      department: 'Psychology'
    }
  ]);

  const handleOnboardDoctor = () => {
    navigate('/onboard-doctor');
  };

  const handleViewDoctorProfile = (doctorId: string) => {
    navigate(`/doctor/${doctorId}`);
  };

  // Filter doctors by department if one is selected
  const filteredDoctors = selectedDepartment 
    ? doctors.filter(doctor => 
        doctor.department.toLowerCase() === selectedDepartment.toLowerCase())
    : doctors;

  // Filter doctors by search term
  const searchFilteredDoctors = searchTerm
    ? filteredDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchTerm.toLowerCase()))
    : filteredDoctors;

  console.log('Selected department:', selectedDepartment);
  console.log('Filtered doctors:', filteredDoctors);
  console.log('All doctors:', doctors);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Doctors</h1>
            <p className="text-muted-foreground">
              {selectedDepartment 
                ? `Showing doctors in ${selectedDepartment} department` 
                : "Manage and view hospital doctors"}
            </p>
          </div>

          <Button 
            className="bg-medical hover:bg-medical-dark"
            onClick={handleOnboardDoctor}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Onboard a Doctor
          </Button>
        </div>

        <div className="relative w-full md:w-1/3 mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {searchFilteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No doctors found in this department.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {searchFilteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="font-bold text-white text-lg">{doctor.name}</h3>
                      <p className="text-white/80">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Department:</span>
                      <span className="text-sm font-medium">{doctor.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Experience:</span>
                      <span className="text-sm font-medium">{doctor.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm font-medium">{doctor.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Phone:</span>
                      <span className="text-sm font-medium">{doctor.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Availability:</span>
                      <span className="text-sm font-medium">{doctor.availability}</span>
                    </div>
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleViewDoctorProfile(doctor.id)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
