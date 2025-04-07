
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
    <div className="hms-container flex h-screen overflow-hidden">
      <Sidebar />
      <main className={cn("flex-1 overflow-y-auto", className)}>
        <div className="container px-4 py-6 mx-auto">
          {children}
        </div>
      </main>
      <ChatBox />
    </div>
  );
}
