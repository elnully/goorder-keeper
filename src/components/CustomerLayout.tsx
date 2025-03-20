
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Search, 
  User, 
  Store, 
  MapPin, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CustomerLayoutProps {
  children: ReactNode;
  className?: string;
}

export function CustomerLayout({ children, className }: CustomerLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('San Francisco, CA');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic - would redirect to search results page
    console.log('Searching for:', searchQuery);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/e179501c-7edb-46f0-a140-c2fe1a48389a.png" 
                alt="GoOrder" 
                className="h-10 w-10 mr-2"
              />
              <span className="text-xl font-bold text-blue-600">GoOrder</span>
            </Link>

            {/* Location Selector */}
            <div className="hidden md:flex items-center text-sm">
              <MapPin className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-muted-foreground">{currentLocation}</span>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products, stores, and more..."
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="ml-2">Search</Button>
            </form>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link to="/stores">
                <Button variant="ghost" size="sm">
                  <Store className="h-4 w-4 mr-2" />
                  Stores
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
              </Link>
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="w-full">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/addresses" className="w-full">Addresses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button variant="default">Sign In</Button>
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full mt-2">Search</Button>
              </form>
              
              <div className="flex items-center mb-4 text-sm">
                <MapPin className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-muted-foreground">{currentLocation}</span>
              </div>
              
              <nav className="flex flex-col space-y-2">
                <Link to="/stores" className="p-2 hover:bg-gray-100 rounded flex items-center">
                  <Store className="h-5 w-5 mr-2" />
                  Stores
                </Link>
                <Link to="/cart" className="p-2 hover:bg-gray-100 rounded flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="p-2 hover:bg-gray-100 rounded flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Profile
                    </Link>
                    <Link to="/orders" className="p-2 hover:bg-gray-100 rounded flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Orders
                    </Link>
                    <button 
                      onClick={logout}
                      className="p-2 hover:bg-gray-100 rounded flex items-center"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="w-full">
                    <Button className="w-full">Sign In</Button>
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={cn("flex-1 animate-fadeIn", className)}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} GoOrder. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CustomerLayout;
