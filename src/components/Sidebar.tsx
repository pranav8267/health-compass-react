
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
  Building,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  // Load saved collapsed state
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed) {
      setCollapsed(savedCollapsed === 'true');
    }
  }, []);

  // Store collapsed state
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(collapsed));
  }, [collapsed]);

  // Store selected department in localStorage
  useEffect(() => {
    if (selectedDepartment) {
      localStorage.setItem('selectedDepartment', selectedDepartment);
    } else {
      localStorage.removeItem('selectedDepartment');
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

  const handleDepartmentSelect = (deptName: string) => {
    if (selectedDepartment === deptName) {
      setSelectedDepartment(null);
    } else {
      setSelectedDepartment(deptName);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const sidebarWidth = collapsed ? 'w-16' : 'w-64';

  return (
    <div className={`bg-sidebar fixed h-full shadow-md border-r transition-all duration-300 ${sidebarWidth}`}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/d42ca3b9-6a51-4cc1-8418-fb5697cf7028.png" 
              alt="Doctora.ai Logo" 
              className="h-8"
            />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleCollapsed}
          className={`${collapsed ? 'ml-auto mr-auto' : 'ml-auto'}`}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="p-2 overflow-y-auto h-[calc(100vh-70px)]">
        <div className="mb-4">
          <Button
            variant="ghost"
            className={`flex items-center w-full mb-2 justify-between ${collapsed ? 'px-2' : ''}`}
            onClick={() => !collapsed && setShowDepartments(!showDepartments)}
          >
            <div className="flex items-center">
              <Building className="w-5 h-5" />
              {!collapsed && <span className="ml-3">Departments</span>}
            </div>
            {!collapsed && <span>{showDepartments ? '−' : '+'}</span>}
          </Button>

          {showDepartments && !collapsed && (
            <div className="ml-8 space-y-2">
              {departments.map((dept) => (
                <Button
                  key={dept.id}
                  variant="ghost"
                  className={`w-full justify-start text-sm ${
                    selectedDepartment === dept.name ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                  }`}
                  onClick={() => handleDepartmentSelect(dept.name)}
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
                    <Button 
                      onClick={handleAddDepartment}
                      className="bg-medical hover:bg-medical-dark"
                    >
                      Add Department
                    </Button>
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
                className={`flex items-center ${collapsed ? 'p-2 justify-center' : 'p-3 justify-start'} rounded-md transition-colors ${
                  location.pathname === link.path
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
                title={collapsed ? link.title : ""}
              >
                {link.icon}
                {!collapsed && <span className="ml-3">{link.title}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className={`absolute bottom-4 ${collapsed ? 'left-0 right-0 flex justify-center' : 'left-0 right-0 p-4'}`}>
          <Button 
            variant="ghost" 
            className={`flex items-center ${collapsed ? 'p-2 justify-center w-12 h-12' : 'p-3 w-full justify-start'} text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md`}
            onClick={logout}
            title={collapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </nav>
    </div>
  );
}
