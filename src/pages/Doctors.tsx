
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle } from 'lucide-react';
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
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
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

  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    experience: '',
    email: '',
    phone: '',
    availability: '',
    department: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleSelectChange = (value: string, field: string) => {
    setNewDoctor({ ...newDoctor, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    const doctorWithId = {
      ...newDoctor,
      id: `${doctors.length + 1}`,
      image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      department: newDoctor.department || newDoctor.specialty  // Default to specialty if department is not set
    };
    
    setDoctors([...doctors, doctorWithId as Doctor]);
    setOpen(false);
    
    toast({
      title: "Doctor Added",
      description: `${newDoctor.name} has been successfully onboarded.`,
    });
    
    // Reset form
    setNewDoctor({
      name: '',
      specialty: '',
      experience: '',
      email: '',
      phone: '',
      availability: '',
      department: ''
    });
  };

  // Filter doctors by department if one is selected
  const filteredDoctors = selectedDepartment 
    ? doctors.filter(doctor => 
        doctor.department.toLowerCase() === selectedDepartment.toLowerCase())
    : doctors;

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

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-medical hover:bg-medical-dark">
                <PlusCircle className="mr-2 h-4 w-4" />
                Onboard a Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Doctor</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new doctor joining the hospital.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={newDoctor.name}
                        onChange={handleInputChange}
                        placeholder="Dr. John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange(value, 'specialty')}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                          <SelectItem value="Neurology">Neurology</SelectItem>
                          <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="Psychology">Psychology</SelectItem>
                          <SelectItem value="Dermatology">Dermatology</SelectItem>
                          <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="Gynecology">Gynecology</SelectItem>
                          <SelectItem value="Oncology">Oncology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange(value, 'department')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Medicine">General Medicine</SelectItem>
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                          <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="Neurology">Neurology</SelectItem>
                          <SelectItem value="Psychology">Psychology</SelectItem>
                          <SelectItem value="Dermatology">Dermatology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <Input
                        id="experience"
                        name="experience"
                        value={newDoctor.experience}
                        onChange={handleInputChange}
                        placeholder="e.g., 5 years"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Input
                        id="availability"
                        name="availability"
                        value={newDoctor.availability}
                        onChange={handleInputChange}
                        placeholder="e.g., Mon, Wed, Fri"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={newDoctor.email}
                        onChange={handleInputChange}
                        placeholder="doctor@hospital.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={newDoctor.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-medical hover:bg-medical-dark">Add Doctor</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No doctors found in this department.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
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
                      <Button variant="outline" className="w-full">View Profile</Button>
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
