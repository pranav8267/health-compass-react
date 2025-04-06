
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UserRound, 
  CalendarClock, 
  Users, 
  Receipt, 
  Wallet, 
  MessageSquare, 
  Menu, 
  LogOut 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

interface SidebarLink {
  title: string;
  path: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

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

  return (
    <aside 
      className={`bg-sidebar fixed h-screen shadow-md transition-all duration-300 border-r z-20 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <h1 className="text-xl font-bold text-primary">HMS Portal</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={collapsed ? "mx-auto" : "ml-auto"}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  location.pathname === link.path
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                } ${collapsed ? 'justify-center' : 'justify-start'}`}
              >
                {link.icon}
                {!collapsed && <span className="ml-3">{link.title}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-4 left-0 right-0 p-4">
          <Button 
            variant="ghost" 
            className={`flex items-center p-3 w-full text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
            onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </nav>
    </aside>
  );
}
