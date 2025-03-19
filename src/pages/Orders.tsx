
import { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, MapPin, Phone, User, Clock, ChevronRight, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-7652',
    customer: { name: 'John Smith', phone: '+1 (555) 123-4567', address: '123 Main St, San Francisco, CA 94105' },
    date: '2023-06-10T14:30:00Z',
    total: 156.00,
    items: [
      { id: 1, name: 'Organic Apples', price: 5.99, quantity: 4 },
      { id: 2, name: 'Whole Grain Bread', price: 4.50, quantity: 2 },
      { id: 3, name: 'Free Range Eggs', price: 6.99, quantity: 1 },
      { id: 4, name: 'Organic Milk', price: 5.49, quantity: 2 },
      { id: 5, name: 'Grass-Fed Ground Beef', price: 9.99, quantity: 1 },
    ],
    status: 'completed',
    paymentMethod: 'Credit Card',
    store: 'Grocery Market Central',
  },
  {
    id: 'ORD-7651',
    customer: { name: 'Sarah Johnson', phone: '+1 (555) 987-6543', address: '456 Oak Ave, Palo Alto, CA 94301' },
    date: '2023-06-10T11:20:00Z',
    total: 87.50,
    items: [
      { id: 6, name: 'Fresh Salmon Fillet', price: 15.99, quantity: 1 },
      { id: 7, name: 'Organic Spinach', price: 3.99, quantity: 2 },
      { id: 8, name: 'Avocados', price: 2.49, quantity: 3 },
    ],
    status: 'processing',
    paymentMethod: 'PayPal',
    store: 'Fresh Foods Market',
  },
  {
    id: 'ORD-7650',
    customer: { name: 'Michael Davis', phone: '+1 (555) 456-7890', address: '789 Pine St, Mountain View, CA 94043' },
    date: '2023-06-09T16:45:00Z',
    total: 212.30,
    items: [
      { id: 9, name: 'Premium Coffee Beans', price: 18.99, quantity: 2 },
      { id: 10, name: 'Artisan Cheese Selection', price: 24.99, quantity: 1 },
      { id: 11, name: 'Organic Wine', price: 29.99, quantity: 2 },
      { id: 12, name: 'Dark Chocolate Truffles', price: 15.99, quantity: 3 },
    ],
    status: 'completed',
    paymentMethod: 'Credit Card',
    store: 'Gourmet Delights',
  },
  {
    id: 'ORD-7649',
    customer: { name: 'Emma Wilson', phone: '+1 (555) 234-5678', address: '101 Cherry Ln, Sunnyvale, CA 94086' },
    date: '2023-06-09T09:10:00Z',
    total: 43.95,
    items: [
      { id: 13, name: 'Fresh Bagels', price: 5.99, quantity: 1 },
      { id: 14, name: 'Cream Cheese', price: 3.99, quantity: 1 },
      { id: 15, name: 'Orange Juice', price: 4.99, quantity: 2 },
      { id: 16, name: 'Blueberry Muffins', price: 7.99, quantity: 3 },
    ],
    status: 'pending',
    paymentMethod: 'Apple Pay',
    store: 'Morning Bakery',
  },
  {
    id: 'ORD-7648',
    customer: { name: 'James Brown', phone: '+1 (555) 876-5432', address: '222 Maple Dr, Santa Clara, CA 95050' },
    date: '2023-06-08T18:30:00Z',
    total: 127.80,
    items: [
      { id: 17, name: 'Grass-Fed Ribeye Steak', price: 24.99, quantity: 2 },
      { id: 18, name: 'Organic Potatoes', price: 5.99, quantity: 1 },
      { id: 19, name: 'Fresh Asparagus', price: 4.99, quantity: 2 },
      { id: 20, name: 'Red Wine', price: 19.99, quantity: 3 },
    ],
    status: 'completed',
    paymentMethod: 'Credit Card',
    store: 'Premium Meats & Produce',
  },
  {
    id: 'ORD-7647',
    customer: { name: 'Olivia Martinez', phone: '+1 (555) 345-6789', address: '333 Cedar St, Redwood City, CA 94063' },
    date: '2023-06-08T10:15:00Z',
    total: 64.25,
    items: [
      { id: 21, name: 'Organic Chicken Breast', price: 12.99, quantity: 2 },
      { id: 22, name: 'Quinoa', price: 6.99, quantity: 1 },
      { id: 23, name: 'Kale', price: 3.49, quantity: 1 },
      { id: 24, name: 'Sweet Potatoes', price: 4.99, quantity: 2 },
    ],
    status: 'cancelled',
    paymentMethod: 'Google Pay',
    store: 'Organic Harvest',
  },
  {
    id: 'ORD-7646',
    customer: { name: 'Ethan Clark', phone: '+1 (555) 567-8901', address: '444 Birch Ave, San Jose, CA 95110' },
    date: '2023-06-07T15:40:00Z',
    total: 98.75,
    items: [
      { id: 25, name: 'Fresh Sushi Platter', price: 45.99, quantity: 1 },
      { id: 26, name: 'Edamame', price: 4.99, quantity: 2 },
      { id: 27, name: 'Miso Soup', price: 3.99, quantity: 3 },
      { id: 28, name: 'Green Tea', price: 2.99, quantity: 2 },
    ],
    status: 'completed',
    paymentMethod: 'Credit Card',
    store: 'Ocean Fresh Sushi',
  },
];

// Order status badge color map
const statusColors = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

// Format date to readable string
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  
  // Filter and sort orders
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOrder === 'highest') {
      return b.total - a.total;
    } else {
      return a.total - b.total;
    }
  });

  const handleOrderSelect = (order: any) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = (newStatus: string) => {
    // Here you would normally update the status in your API
    // For demo, we'll just show a toast
    toast.success(`Order ${selectedOrder.id} status updated to ${newStatus}`);
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Orders" 
        description="Manage and track customer orders"
      >
        <Button variant="outline" className="mr-2">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button variant="outline" className="mr-2">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button>
          Process Orders
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filters and Search */}
        <div className="lg:col-span-12 flex flex-col sm:flex-row gap-4 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-row gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Amount</SelectItem>
                <SelectItem value="lowest">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders List */}
        <div className="lg:col-span-12">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <Card>
                <CardContent className="p-0">
                  {filteredOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="rounded-full bg-muted p-3 mb-3">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold">No orders found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                      <Button variant="outline" onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('all');
                      }}>
                        Reset Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium py-3 px-4">Order ID</th>
                            <th className="text-left font-medium py-3 px-4">Customer</th>
                            <th className="text-left font-medium py-3 px-4">Date</th>
                            <th className="text-left font-medium py-3 px-4">Total</th>
                            <th className="text-left font-medium py-3 px-4">Status</th>
                            <th className="text-left font-medium py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.map((order) => (
                            <tr 
                              key={order.id} 
                              className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                              onClick={() => handleOrderSelect(order)}
                            >
                              <td className="py-3 px-4 font-medium">{order.id}</td>
                              <td className="py-3 px-4">{order.customer.name}</td>
                              <td className="py-3 px-4">{formatDate(order.date)}</td>
                              <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                              <td className="py-3 px-4">
                                <Badge 
                                  variant="outline" 
                                  className={`${statusColors[order.status as keyof typeof statusColors]}`}
                                >
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOrderSelect(order);
                                      }}
                                    >
                                      View
                                      <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl">
                                    {selectedOrder && (
                                      <>
                                        <DialogHeader>
                                          <div className="flex justify-between items-center">
                                            <DialogTitle>Order Details</DialogTitle>
                                            <Badge 
                                              variant="outline" 
                                              className={`${statusColors[selectedOrder.status as keyof typeof statusColors]}`}
                                            >
                                              {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                            </Badge>
                                          </div>
                                          <DialogDescription>
                                            Order {selectedOrder.id} • Placed on {formatDate(selectedOrder.date)}
                                          </DialogDescription>
                                        </DialogHeader>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                          {/* Customer Information */}
                                          <div className="space-y-3">
                                            <h3 className="font-semibold flex items-center">
                                              <User className="inline mr-2 h-4 w-4" />
                                              Customer Information
                                            </h3>
                                            <p className="text-sm font-medium">{selectedOrder.customer.name}</p>
                                            <p className="text-sm flex items-center text-muted-foreground">
                                              <Phone className="inline mr-2 h-4 w-4" />
                                              {selectedOrder.customer.phone}
                                            </p>
                                            <div className="text-sm flex items-start text-muted-foreground">
                                              <MapPin className="inline mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                                              <span>{selectedOrder.customer.address}</span>
                                            </div>
                                          </div>
                                          
                                          {/* Order Information */}
                                          <div className="space-y-3">
                                            <h3 className="font-semibold flex items-center">
                                              <Clock className="inline mr-2 h-4 w-4" />
                                              Order Information
                                            </h3>
                                            <p className="text-sm">
                                              <span className="text-muted-foreground">Payment Method:</span> {selectedOrder.paymentMethod}
                                            </p>
                                            <p className="text-sm">
                                              <span className="text-muted-foreground">Store:</span> {selectedOrder.store}
                                            </p>
                                            <p className="text-sm">
                                              <span className="text-muted-foreground">Total Amount:</span> ${selectedOrder.total.toFixed(2)}
                                            </p>
                                          </div>
                                        </div>
                                        
                                        <Separator className="my-4" />
                                        
                                        {/* Order Items */}
                                        <div>
                                          <h3 className="font-semibold mb-3">Order Items</h3>
                                          <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                              <thead>
                                                <tr className="border-b">
                                                  <th className="text-left font-medium py-2 px-4">Item</th>
                                                  <th className="text-right font-medium py-2 px-4">Price</th>
                                                  <th className="text-right font-medium py-2 px-4">Qty</th>
                                                  <th className="text-right font-medium py-2 px-4">Subtotal</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {selectedOrder.items.map((item: any) => (
                                                  <tr key={item.id} className="border-b">
                                                    <td className="py-2 px-4">{item.name}</td>
                                                    <td className="py-2 px-4 text-right">${item.price.toFixed(2)}</td>
                                                    <td className="py-2 px-4 text-right">{item.quantity}</td>
                                                    <td className="py-2 px-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                              <tfoot>
                                                <tr className="font-medium">
                                                  <td colSpan={3} className="py-2 px-4 text-right">Total</td>
                                                  <td className="py-2 px-4 text-right">${selectedOrder.total.toFixed(2)}</td>
                                                </tr>
                                              </tfoot>
                                            </table>
                                          </div>
                                        </div>
                                        
                                        <Separator className="my-4" />
                                        
                                        {/* Order Actions */}
                                        <div className="flex flex-col sm:flex-row gap-3 justify-end">
                                          <Select
                                            defaultValue={selectedOrder.status}
                                            onValueChange={handleUpdateStatus}
                                          >
                                            <SelectTrigger className="w-40">
                                              <SelectValue placeholder="Update Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="pending">Pending</SelectItem>
                                              <SelectItem value="processing">Processing</SelectItem>
                                              <SelectItem value="completed">Completed</SelectItem>
                                              <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <Button variant="outline">Print Invoice</Button>
                                          <Button>Contact Customer</Button>
                                        </div>
                                      </>
                                    )}
                                  </DialogContent>
                                </Dialog>
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
            
            <TabsContent value="recent" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Recent orders will be shown here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="processing" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Processing orders will be shown here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Completed orders will be shown here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
}
