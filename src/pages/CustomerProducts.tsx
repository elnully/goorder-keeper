
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomerLayout } from '@/components/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Tag, 
  Package2, 
  Star, 
  ShoppingCart,
  SlidersHorizontal
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from '@/hooks/use-toast';

// Import the mock products data from the Products.tsx page
import { mockProducts } from '@/pages/Products';

export default function CustomerProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [storeFilter, setStoreFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('featured');
  const { toast } = useToast();
  
  // Extract unique categories and stores
  const categories = [...new Set(mockProducts.map(p => p.category))];
  const stores = [...new Set(mockProducts.flatMap(p => p.stores))];

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStore = storeFilter === 'all' || product.stores.includes(storeFilter);
    
    return matchesSearch && matchesCategory && matchesStore;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        // Default "featured" sort - we'll just use the original order
        return 0;
    }
  });

  const addToCart = (productId: number, productName: string) => {
    // In a real app, this would add the product to a cart
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart`,
    });
  };

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">All Products</h1>
            <p className="text-muted-foreground mt-1">
              Browse our selection of quality products
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down products by category and store
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category: string) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Store</label>
                    <Select value={storeFilter} onValueChange={setStoreFilter}>
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="All Stores" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stores</SelectItem>
                        {stores.map((store: string) => (
                          <SelectItem key={store} value={store}>{store}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => {
                      setCategoryFilter('all');
                      setStoreFilter('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category: string) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Store</label>
                  <Select value={storeFilter} onValueChange={setStoreFilter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="All Stores" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stores</SelectItem>
                      {stores.map((store: string) => (
                        <SelectItem key={store} value={store}>{store}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setStoreFilter('all');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Mobile Search */}
            <div className="mb-4 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            {sortedProducts.length === 0 ? (
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
                  }}>
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Showing {sortedProducts.length} products
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <Link to={`/products/${product.id}`}>
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          {product.status !== 'in-stock' && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <Badge variant="secondary" className="text-white bg-black/60 border-white">
                                {product.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-start justify-between">
                            <Link to={`/products/${product.id}`} className="group">
                              <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center">
                                <Tag className="h-3 w-3 mr-1" />
                                {product.category}
                              </p>
                            </Link>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm ml-1">4.5</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center gap-1"
                              onClick={() => addToCart(product.id, product.name)}
                              disabled={product.status === 'out-of-stock'}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              <span>Add</span>
                            </Button>
                          </div>
                          <div className="text-xs mt-2">
                            <div className="flex flex-wrap gap-1 mt-1">
                              {product.stores.slice(0, 1).map(store => (
                                <Link to={`/stores/${store.replace(/\s+/g, '-').toLowerCase()}`} key={store}>
                                  <Badge variant="secondary" className="text-xs hover:bg-secondary/80">
                                    {store}
                                  </Badge>
                                </Link>
                              ))}
                              {product.stores.length > 1 && (
                                <Badge variant="outline" className="text-xs">
                                  +{product.stores.length - 1} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
