
import { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Tag, Package2, Truck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Organic Apples',
    category: 'Fruits',
    price: 5.99,
    stock: 120,
    sku: 'FRUIT-001',
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwcGxlfGVufDB8fDB8fHww',
    stores: ['Grocery Market Central', 'Fresh Foods Market'],
    status: 'in-stock',
  },
  {
    id: 2,
    name: 'Whole Grain Bread',
    category: 'Bakery',
    price: 4.50,
    stock: 45,
    sku: 'BAKERY-101',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJlYWR8ZW58MHx8MHx8fDA%3D',
    stores: ['Grocery Market Central', 'Morning Bakery'],
    status: 'in-stock',
  },
  {
    id: 3,
    name: 'Free Range Eggs',
    category: 'Dairy & Eggs',
    price: 6.99,
    stock: 72,
    sku: 'DAIRY-023',
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVnZ3N8ZW58MHx8MHx8fDA%3D',
    stores: ['Grocery Market Central', 'Fresh Foods Market', 'Organic Harvest'],
    status: 'in-stock',
  },
  {
    id: 4,
    name: 'Organic Milk',
    category: 'Dairy & Eggs',
    price: 5.49,
    stock: 38,
    sku: 'DAIRY-011',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsa3xlbnwwfHwwfHx8MA%3D%3D',
    stores: ['Grocery Market Central', 'Fresh Foods Market', 'Organic Harvest'],
    status: 'low-stock',
  },
  {
    id: 5,
    name: 'Grass-Fed Ground Beef',
    category: 'Meat & Seafood',
    price: 9.99,
    stock: 25,
    sku: 'MEAT-067',
    image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3JvdW5kJTIwYmVlZnxlbnwwfHwwfHx8MA%3D%3D',
    stores: ['Grocery Market Central', 'Premium Meats & Produce'],
    status: 'in-stock',
  },
  {
    id: 6,
    name: 'Fresh Salmon Fillet',
    category: 'Meat & Seafood',
    price: 15.99,
    stock: 18,
    sku: 'SEAFOOD-042',
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww',
    stores: ['Fresh Foods Market', 'Premium Meats & Produce', 'Ocean Fresh Sushi'],
    status: 'low-stock',
  },
  {
    id: 7,
    name: 'Organic Spinach',
    category: 'Vegetables',
    price: 3.99,
    stock: 50,
    sku: 'VEG-021',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D',
    stores: ['Grocery Market Central', 'Fresh Foods Market', 'Organic Harvest'],
    status: 'in-stock',
  },
  {
    id: 8,
    name: 'Avocados',
    category: 'Fruits',
    price: 2.49,
    stock: 65,
    sku: 'FRUIT-019',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2Fkb3xlbnwwfHwwfHx8MA%3D%3D',
    stores: ['Grocery Market Central', 'Fresh Foods Market', 'Organic Harvest'],
    status: 'in-stock',
  },
  {
    id: 9,
    name: 'Premium Coffee Beans',
    category: 'Beverages',
    price: 18.99,
    stock: 30,
    sku: 'BEV-089',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwYmVhbnN8ZW58MHx8MHx8fDA%3D',
    stores: ['Grocery Market Central', 'Gourmet Delights'],
    status: 'in-stock',
  },
  {
    id: 10,
    name: 'Artisan Cheese Selection',
    category: 'Dairy & Eggs',
    price: 24.99,
    stock: 12,
    sku: 'DAIRY-056',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlZXNlfGVufDB8fDB8fHww',
    stores: ['Grocery Market Central', 'Gourmet Delights'],
    status: 'low-stock',
  },
  {
    id: 11,
    name: 'Organic Wine',
    category: 'Beverages',
    price: 29.99,
    stock: 24,
    sku: 'BEV-102',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2luZXxlbnwwfHwwfHx8MA%3D%3D',
    stores: ['Grocery Market Central', 'Gourmet Delights'],
    status: 'in-stock',
  },
  {
    id: 12,
    name: 'Dark Chocolate Truffles',
    category: 'Snacks & Candy',
    price: 15.99,
    stock: 0,
    sku: 'SNACK-034',
    image: 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNob2NvbGF0ZXxlbnwwfHwwfHx8MA%3D%3D',
    stores: ['Grocery Market Central', 'Gourmet Delights'],
    status: 'out-of-stock',
  },
];

const categories = [...new Set(mockProducts.map(p => p.category))];
const stores = [...new Set(mockProducts.flatMap(p => p.stores))];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [storeFilter, setStoreFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStore = storeFilter === 'all' || product.stores.includes(storeFilter);
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStore && matchesStatus;
  });

  return (
    <PageLayout>
      <PageHeader 
        title="Products" 
        description="Manage your product inventory"
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </PageHeader>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={storeFilter} onValueChange={setStoreFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              {stores.map(store => (
                <SelectItem key={store} value={store}>{store}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {mockProducts.length} products
          </div>
        </div>
        
        <TabsContent value="grid" className="mt-0">
          {filteredProducts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-muted p-3 mb-3">
                  <Package2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setStoreFilter('all');
                  setStatusFilter('all');
                }}>
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="outline" className={
                        product.status === 'in-stock' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : product.status === 'low-stock'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }>
                        {product.status === 'in-stock' 
                          ? 'In Stock' 
                          : product.status === 'low-stock' 
                          ? 'Low Stock' 
                          : 'Out of Stock'}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Tag className="h-3 w-3 mr-1" />
                            {product.category}
                          </p>
                        </div>
                        <p className="font-bold">${product.price.toFixed(2)}</p>
                      </div>
                      <div className="text-sm flex justify-between">
                        <span className="text-muted-foreground">SKU: {product.sku}</span>
                        <span>Stock: {product.stock}</span>
                      </div>
                      <div className="text-xs mt-2">
                        <span className="text-muted-foreground">Available at:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.stores.map(store => (
                            <Badge variant="secondary" key={store} className="text-xs">
                              {store}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="table" className="mt-0">
          <Card>
            <CardContent className="p-0">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="rounded-full bg-muted p-3 mb-3">
                    <Package2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setStoreFilter('all');
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
                        <th className="text-left font-medium py-3 px-4">Product</th>
                        <th className="text-left font-medium py-3 px-4">Category</th>
                        <th className="text-left font-medium py-3 px-4">SKU</th>
                        <th className="text-right font-medium py-3 px-4">Price</th>
                        <th className="text-right font-medium py-3 px-4">Stock</th>
                        <th className="text-left font-medium py-3 px-4">Status</th>
                        <th className="text-left font-medium py-3 px-4 sr-only">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0">
                                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                              </div>
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{product.category}</td>
                          <td className="py-3 px-4">{product.sku}</td>
                          <td className="py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right">{product.stock}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={
                              product.status === 'in-stock' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                : product.status === 'low-stock'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            }>
                              {product.status === 'in-stock' 
                                ? 'In Stock' 
                                : product.status === 'low-stock' 
                                ? 'Low Stock' 
                                : 'Out of Stock'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">Edit</Button>
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
      </Tabs>
    </PageLayout>
  );
}
