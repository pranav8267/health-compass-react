
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="hms-container">
      <Sidebar />
      <main className={cn("ml-20 md:ml-64 hms-main-content", className)}>
        {children}
        <SearchBar />
      </main>
    </div>
  );
}
