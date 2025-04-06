
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, you would validate credentials with your backend
    if (email === 'admin@hospital.com' && password === 'password') {
      const userData: User = {
        id: '1',
        name: 'Hospital Admin',
        role: 'admin',
        email: email
      };
      
      setUser(userData);
      localStorage.setItem('hms_user', JSON.stringify(userData));
      toast({
        title: "Login successful",
        description: "Welcome back to HMS Dashboard",
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hms_user');
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
