
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ChatBox from '@/components/ChatBox';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="sidebar-container fixed h-full z-30">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 ml-64">
        {/* Page content */}
        <main className={cn("flex-1 overflow-y-auto p-6", className)}>
          <div className="container mx-auto">
            {children}
          </div>
        </main>
        
        {/* Chat */}
        <div className="chat-container w-1/3">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
