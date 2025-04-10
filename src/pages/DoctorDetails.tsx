
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Calendar } from 'lucide-react';
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

export default function DoctorDetails() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the doctor details from your API
    // For now, we'll use sample data
    const fetchDoctor = () => {
      const sampleDoctors: Doctor[] = [
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
      ];

      const foundDoctor = sampleDoctors.find(d => d.id === doctorId);
      setDoctor(foundDoctor || null);
      setLoading(false);
    };

    fetchDoctor();
  }, [doctorId]);

  const handleEdit = () => {
    // In a real app, you would navigate to an edit page
    toast({
      title: "Edit Doctor",
      description: "This functionality is not implemented yet.",
    });
  };

  const handleDelete = () => {
    // In a real app, you would delete the doctor from your backend
    toast({
      title: "Doctor Removed",
      description: "The doctor has been successfully removed.",
    });
    navigate('/doctors');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[70vh]">
          <p>Loading doctor details...</p>
        </div>
      </Layout>
    );
  }

  if (!doctor) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[70vh]">
          <p>Doctor not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/doctors')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{doctor.name}</h1>
            <p className="text-muted-foreground">{doctor.specialty} • {doctor.department}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-0">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-auto rounded-t-lg"
                />
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/bookings')}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      View Schedule
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleEdit}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={handleDelete}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Specialty</h3>
                    <p className="text-base">{doctor.specialty}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                    <p className="text-base">{doctor.department}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Experience</h3>
                    <p className="text-base">{doctor.experience}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Availability</h3>
                    <p className="text-base">{doctor.availability}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p className="text-base">{doctor.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p className="text-base">{doctor.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">About</h3>
                  <p className="text-base">
                    {doctor.name} is a highly experienced {doctor.specialty} specialist with {doctor.experience} of practice.
                    They are dedicated to providing exceptional care and have expertise in diagnosing and treating a wide range of conditions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
