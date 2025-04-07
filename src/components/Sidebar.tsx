
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UserRound, 
  CalendarClock, 
  Users, 
  Receipt, 
  Wallet, 
  MessageSquare, 
  Menu, 
  LogOut,
  Plus,
  Building
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";

interface SidebarLink {
  title: string;
  path: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

interface Department {
  id: string;
  name: string;
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'General Medicine' },
    { id: '2', name: 'Cardiology' },
    { id: '3', name: 'Pediatrics' }
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [showDepartments, setShowDepartments] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  
  const location = useLocation();
  const { logout } = useAuth();
  const { toast } = useToast();

  // Store selected department in localStorage
  useEffect(() => {
    if (selectedDepartment) {
      localStorage.setItem('selectedDepartment', selectedDepartment);
    }
  }, [selectedDepartment]);

  // Load selected department from localStorage
  useEffect(() => {
    const savedDepartment = localStorage.getItem('selectedDepartment');
    if (savedDepartment) {
      setSelectedDepartment(savedDepartment);
    }
  }, []);

  const links: SidebarLink[] = [
    { title: 'My Doctors', path: '/doctors', icon: <UserRound className="w-5 h-5" /> },
    { title: 'My Bookings', path: '/bookings', icon: <CalendarClock className="w-5 h-5" /> },
    { title: 'My Patients', path: '/patients', icon: <Users className="w-5 h-5" /> },
    { title: 'Billing', path: '/billing', icon: <Receipt className="w-5 h-5" /> },
    { 
      title: 'Accounts', 
      path: '/accounts', 
      icon: <Wallet className="w-5 h-5" />,
      requiresAuth: true 
    },
    { 
      title: 'Communication', 
      path: '/communication', 
      icon: <MessageSquare className="w-5 h-5" />,
      requiresAuth: true
    },
  ];

  const handleAddDepartment = () => {
    if (!newDepartmentName.trim()) return;
    
    const newDepartment: Department = {
      id: Date.now().toString(),
      name: newDepartmentName,
    };
    
    setDepartments([...departments, newDepartment]);
    setNewDepartmentName('');
    setOpenDialog(false);
    
    toast({
      title: "Department Added",
      description: `${newDepartmentName} department has been created.`,
    });
  };

  return (
    <div className={`bg-sidebar fixed h-full shadow-md border-r w-64`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold text-primary">HMS Portal</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <nav className="p-4 overflow-y-auto h-[calc(100vh-70px)]">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="flex items-center w-full mb-2 justify-between"
            onClick={() => setShowDepartments(!showDepartments)}
          >
            <div className="flex items-center">
              <Building className="w-5 h-5" />
              <span className="ml-3">Departments</span>
            </div>
            <span>{showDepartments ? '−' : '+'}</span>
          </Button>

          {showDepartments && (
            <div className="ml-8 space-y-2">
              {departments.map((dept) => (
                <Button
                  key={dept.id}
                  variant="ghost"
                  className={`w-full justify-start text-sm ${
                    selectedDepartment === dept.name ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                  }`}
                  onClick={() => setSelectedDepartment(dept.name === selectedDepartment ? null : dept.name)}
                >
                  {dept.name}
                </Button>
              ))}
              
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Department
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Department</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Department Name</Label>
                      <Input
                        id="name"
                        value={newDepartmentName}
                        onChange={(e) => setNewDepartmentName(e.target.value)}
                        placeholder="e.g., Psychology"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddDepartment}>Add Department</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  location.pathname === link.path
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                } justify-start`}
              >
                {link.icon}
                <span className="ml-3">{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-4 left-0 right-0 p-4">
          <Button 
            variant="ghost" 
            className="flex items-center p-3 w-full text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md justify-start"
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
