
import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import FloatingChat from '@/components/FloatingChat';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  // Load sidebar collapsed state from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed) {
      setCollapsed(savedCollapsed === 'true');
    }
  }, []);
  
  // Listen for changes to the sidebar collapsed state
  useEffect(() => {
    const handleStorageChange = () => {
      const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
      setCollapsed(isCollapsed);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="sidebar-container fixed h-full z-30">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <main 
        className={cn(
          "flex-1 overflow-y-auto p-6 transition-all duration-300", 
          collapsed ? "ml-16" : "ml-64",
          className
        )}
      >
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      
      {/* Floating Chat Button */}
      <FloatingChat />
    </div>
  );
}
