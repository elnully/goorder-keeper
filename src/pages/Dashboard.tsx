
import { PageLayout } from '@/components/PageLayout';
import { PageHeader } from '@/components/PageHeader';
import { StatsCard } from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Package, Users, DollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Mock data for charts and stats
const revenueData = [
  { month: 'Jan', revenue: 1500 },
  { month: 'Feb', revenue: 2300 },
  { month: 'Mar', revenue: 3200 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 3800 },
  { month: 'Jun', revenue: 5000 },
  { month: 'Jul', revenue: 6500 },
];

const ordersByStatusData = [
  { name: 'Completed', value: 65 },
  { name: 'Processing', value: 20 },
  { name: 'Pending', value: 10 },
  { name: 'Cancelled', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentOrders = [
  { id: 'ORD-7652', customer: 'John Smith', date: '2023-06-10', total: '$156.00', status: 'completed' },
  { id: 'ORD-7651', customer: 'Sarah Johnson', date: '2023-06-10', total: '$87.50', status: 'processing' },
  { id: 'ORD-7650', customer: 'Michael Davis', date: '2023-06-09', total: '$212.30', status: 'completed' },
  { id: 'ORD-7649', customer: 'Emma Wilson', date: '2023-06-09', total: '$43.95', status: 'pending' },
  { id: 'ORD-7648', customer: 'James Brown', date: '2023-06-08', total: '$127.80', status: 'completed' },
];

export default function Dashboard() {
  return (
    <PageLayout>
      <PageHeader 
        title="Dashboard" 
        description="Welcome to your GoOrder dashboard."
      >
        <Button>Download Reports</Button>
      </PageHeader>

      {/* Stats Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Orders"
          value="1,284"
          description="Last 30 days"
          trend={{ value: 12, isPositive: true }}
          icon={<ShoppingBag className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Revenue"
          value="$48,295"
          description="Last 30 days"
          trend={{ value: 8, isPositive: true }}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatsCard
          title="Active Customers"
          value="573"
          description="3.2% increase"
          trend={{ value: 3.2, isPositive: true }}
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Product Inventory"
          value="842"
          description="15 low stock items"
          trend={{ value: 5, isPositive: false }}
          icon={<Package className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Revenue Chart */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0064CC" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#0064CC" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#0064CC"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Pie Chart */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Orders by Status</CardTitle>
                <CardDescription>Distribution of orders by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ordersByStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {ordersByStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend verticalAlign="bottom" height={36} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed insights will be available here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <p>Advanced analytics content will be available soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Download and view your reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                <p>Report generation features coming soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium py-3 px-4">Order ID</th>
                  <th className="text-left font-medium py-3 px-4">Customer</th>
                  <th className="text-left font-medium py-3 px-4">Date</th>
                  <th className="text-left font-medium py-3 px-4">Total</th>
                  <th className="text-left font-medium py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4">{order.total}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline">View All Orders</Button>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
