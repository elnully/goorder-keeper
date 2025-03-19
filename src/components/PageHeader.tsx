
import { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", className)}>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight animate-slideDown">{title}</h1>
        {description && (
          <p className="text-muted-foreground animate-slideDown animation-delay-100">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-4 animate-slideDown animation-delay-200">
          {children}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
