
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  // This layout is specifically for the admin portal
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={cn(
        "pt-16 md:pt-6 pb-8 md:pl-64 transition-all duration-300 animate-fadeIn",
        className
      )}>
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
