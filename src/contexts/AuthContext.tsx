
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginParams {
  isAuthenticated: boolean;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (params: LoginParams) => void;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin credentials
const MOCK_ADMIN = {
  id: '1',
  name: 'Admin User',
  email: 'admin@goorder.com',
  password: 'admin123',
  role: 'admin',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for existing session
    const checkAuth = () => {
      const storedUser = localStorage.getItem('goorder-user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('goorder-user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // This is the function used by CustomerLogin
  const login = (params: LoginParams) => {
    // For customer login (using phone verification)
    // Create a simplified user object for customers
    const customerUser = {
      id: Date.now().toString(), // Generate a temporary ID
      name: 'Customer', // Generic name since we only have phone
      email: '', // Empty since we don't collect email
      role: params.role,
    };
    
    // Store in state and localStorage
    setUser(customerUser);
    localStorage.setItem('goorder-user', JSON.stringify(customerUser));
    
    // Redirect to home or intended page
    const destination = location.state?.from?.pathname || '/';
    navigate(destination);
  };

  // This is the original login function for admin
  const loginWithCredentials = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Check credentials
      if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
        // Create user object (omitting the password)
        const authenticatedUser = {
          id: MOCK_ADMIN.id,
          name: MOCK_ADMIN.name,
          email: MOCK_ADMIN.email,
          role: MOCK_ADMIN.role,
        };
        
        // Store in state and localStorage
        setUser(authenticatedUser);
        localStorage.setItem('goorder-user', JSON.stringify(authenticatedUser));
        
        // Redirect to dashboard or intended page
        const destination = location.state?.from?.pathname || '/dashboard';
        navigate(destination);
        
        toast.success('Welcome back!');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed: Invalid email or password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('goorder-user');
    navigate('/login');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      loginWithCredentials, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
