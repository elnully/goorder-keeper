
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // If authentication is still loading, show nothing or a loader
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-primary/20 mb-4"></div>
          <div className="h-4 w-40 bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to appropriate login page
  if (!isAuthenticated) {
    // If this is an admin route, redirect to admin login, otherwise customer login
    const loginPath = requireAdmin ? "/login" : "/customer/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // For admin routes, check if user has admin role
  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated, render the protected route
  return <>{children}</>;
}

export default ProtectedRoute;
