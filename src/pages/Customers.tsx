
import { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  MoreHorizontal,
  Download,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for customers
const mockCustomers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94105',
    registeredDate: '2023-01-15',
    totalOrders: 12,
    totalSpent: 834.50,
    lastOrder: '2023-06-10',
    avatar: null,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Ave, Palo Alto, CA 94301',
    registeredDate: '2023-02-03',
    totalOrders: 8,
    totalSpent: 523.75,
    lastOrder: '2023-06-10',
    avatar: null,
  },
  {
    id: 3,
    name: 'Michael Davis',
    email: 'michael.davis@example.com',
    phone: '+1 (555) 456-7890',
    address: '789 Pine St, Mountain View, CA 94043',
    registeredDate: '2023-02-18',
    totalOrders: 15,
    totalSpent: 1247.30,
    lastOrder: '2023-06-09',
    avatar: null,
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    phone: '+1 (555) 234-5678',
    address: '101 Cherry Ln, Sunnyvale, CA 94086',
    registeredDate: '2023-03-05',
    totalOrders: 5,
    totalSpent: 321.45,
    lastOrder: '2023-06-09',
    avatar: null,
  },
  {
    id: 5,
    name: 'James Brown',
    email: 'james.brown@example.com',
    phone: '+1 (555) 876-5432',
    address: '222 Maple Dr, Santa Clara, CA 95050',
    registeredDate: '2023-03-22',
    totalOrders: 10,
    totalSpent: 678.90,
    lastOrder: '2023-06-08',
    avatar: null,
  },
  {
    id: 6,
    name: 'Olivia Martinez',
    email: 'olivia.martinez@example.com',
    phone: '+1 (555) 345-6789',
    address: '333 Cedar St, Redwood City, CA 94063',
    registeredDate: '2023-04-08',
    totalOrders: 7,
    totalSpent: 432.15,
    lastOrder: '2023-06-08',
    avatar: null,
  },
  {
    id: 7,
    name: 'Ethan Clark',
    email: 'ethan.clark@example.com',
    phone: '+1 (555) 567-8901',
    address: '444 Birch Ave, San Jose, CA 95110',
    registeredDate: '2023-04-17',
    totalOrders: 9,
    totalSpent: 543.80,
    lastOrder: '2023-06-07',
    avatar: null,
  },
  {
    id: 8,
    name: 'Sophia Lee',
    email: 'sophia.lee@example.com',
    phone: '+1 (555) 678-9012',
    address: '555 Willow St, Campbell, CA 95008',
    registeredDate: '2023-05-02',
    totalOrders: 6,
    totalSpent: 389.25,
    lastOrder: '2023-06-07',
    avatar: null,
  },
  {
    id: 9,
    name: 'Daniel Taylor',
    email: 'daniel.taylor@example.com',
    phone: '+1 (555) 789-0123',
    address: '666 Pine St, Menlo Park, CA 94025',
    registeredDate: '2023-05-14',
    totalOrders: 4,
    totalSpent: 257.50,
    lastOrder: '2023-06-06',
    avatar: null,
  },
  {
    id: 10,
    name: 'Ava Anderson',
    email: 'ava.anderson@example.com',
    phone: '+1 (555) 890-1234',
    address: '777 Oak St, Los Altos, CA 94022',
    registeredDate: '2023-05-30',
    totalOrders: 3,
    totalSpent: 198.75,
    lastOrder: '2023-06-06',
    avatar: null,
  },
];

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Filter and sort customers
  const filteredCustomers = mockCustomers
    .filter(customer => {
      const searchLower = searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone.includes(searchQuery)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'orders') {
        comparison = a.totalOrders - b.totalOrders;
      } else if (sortField === 'spent') {
        comparison = a.totalSpent - b.totalSpent;
      } else if (sortField === 'date') {
        comparison = new Date(a.registeredDate).getTime() - new Date(b.registeredDate).getTime();
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Customers" 
        description="View and manage your customer base"
      >
        <Button variant="outline" className="mr-2">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-7 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="md:col-span-5 flex flex-wrap gap-4 md:justify-end">
          <Select value={sortField} onValueChange={setSortField}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="orders">Total Orders</SelectItem>
              <SelectItem value="spent">Total Spent</SelectItem>
              <SelectItem value="date">Registration Date</SelectItem>
            </SelectContent>
          </Select>
          <Select 
            value={sortOrder} 
            onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="new">New Customers</TabsTrigger>
          <TabsTrigger value="repeat">Repeat Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              {filteredCustomers.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="rounded-full bg-muted p-3 mb-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No customers found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search to find what you're looking for.
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium py-3 px-4">Customer</th>
                        <th className="text-left font-medium py-3 px-4 hidden md:table-cell">Contact Info</th>
                        <th className="text-center font-medium py-3 px-4 hidden lg:table-cell">Orders</th>
                        <th className="text-center font-medium py-3 px-4 hidden lg:table-cell">Total Spent</th>
                        <th className="text-center font-medium py-3 px-4 hidden lg:table-cell">Last Order</th>
                        <th className="text-right font-medium py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map(customer => (
                        <tr key={customer.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={customer.avatar || ''} />
                                <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center lg:hidden">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Joined {new Date(customer.registeredDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <div className="space-y-1">
                              <div className="flex items-center text-xs">
                                <Mail className="h-3 w-3 mr-1" />
                                {customer.email}
                              </div>
                              <div className="flex items-center text-xs">
                                <Phone className="h-3 w-3 mr-1" />
                                {customer.phone}
                              </div>
                              <div className="flex items-start text-xs">
                                <MapPin className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                                <span className="truncate max-w-xs">{customer.address}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center hidden lg:table-cell">
                            <div className="flex items-center justify-center text-sm">
                              <ShoppingBag className="h-4 w-4 mr-1 text-muted-foreground" />
                              {customer.totalOrders}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center hidden lg:table-cell">
                            <div className="font-medium">${customer.totalSpent.toFixed(2)}</div>
                          </td>
                          <td className="py-3 px-4 text-center hidden lg:table-cell">
                            <div className="text-muted-foreground">
                              {new Date(customer.lastOrder).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Customer</DropdownMenuItem>
                                <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                                <DropdownMenuItem>View Orders</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Delete Customer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">New customers will be shown here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="repeat" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">Repeat customers will be shown here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
