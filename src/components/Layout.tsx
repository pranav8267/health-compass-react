
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
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
    <div className="hms-container relative">
      <Sidebar />
      <main className={cn("ml-20 md:ml-64 min-h-screen pb-16", className)}>
        {children}
        <div className="fixed bottom-0 left-0 right-0 z-10 px-4">
          <div className="ml-20 md:ml-64">
            <SearchBar />
          </div>
        </div>
      </main>
    </div>
  );
}
