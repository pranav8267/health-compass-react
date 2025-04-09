
import { ReactNode } from 'react';
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

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="sidebar-container fixed h-full z-30">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <main className={cn("flex-1 ml-64 overflow-y-auto p-6", className)}>
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      
      {/* Floating Chat Button */}
      <FloatingChat />
    </div>
  );
}
