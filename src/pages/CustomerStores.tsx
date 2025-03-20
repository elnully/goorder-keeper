
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomerLayout } from '@/components/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  Store
} from 'lucide-react';

// Mock data for stores
const mockStores = [
  {
    id: 1,
    name: 'Grocery Market Central',
    description: 'Your one-stop shop for all grocery needs with fresh produce, quality meats, and pantry essentials.',
    address: '123 Market Street, San Francisco, CA 94103',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyeSUyMHN0b3JlfGVufDB8fDB8fHww',
    rating: 4.7,
    categories: ['Grocery', 'Produce', 'Bakery', 'Meat & Seafood'],
    hours: '8:00 AM - 9:00 PM',
    distance: '0.8 miles away',
  },
  {
    id: 2,
    name: 'Fresh Foods Market',
    description: 'Specializing in organic and locally-sourced produce, dairy, and specialty items for health-conscious shoppers.',
    address: '456 Health Avenue, San Francisco, CA 94110',
    image: 'https://images.unsplash.com/photo-1601273058307-be200655d6f5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdyb2NlcnklMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.9,
    categories: ['Organic', 'Produce', 'Health Foods', 'Specialty'],
    hours: '7:00 AM - 8:00 PM',
    distance: '1.2 miles away',
  },
  {
    id: 3,
    name: 'Premium Meats & Produce',
    description: 'Premium butcher shop offering high-quality meats, poultry, and selected fresh produce.',
    address: '789 Butcher Lane, San Francisco, CA 94107',
    image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVhdCUyMHNob3B8ZW58MHx8MHx8fDA%3D',
    rating: 4.6,
    categories: ['Butcher', 'Meat & Seafood', 'Specialty'],
    hours: '8:00 AM - 7:00 PM',
    distance: '1.5 miles away',
  },
  {
    id: 4,
    name: 'Organic Harvest',
    description: 'Fully organic grocery store with a wide selection of produce, bulk foods, and eco-friendly household items.',
    address: '101 Green Street, San Francisco, CA 94111',
    image: 'https://images.unsplash.com/photo-1594054879555-0b56f6f6e957?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b3JnYW5pYyUyMHN0b3JlfGVufDB8fDB8fHww',
    rating: 4.8,
    categories: ['Organic', 'Bulk Foods', 'Eco-Friendly', 'Produce'],
    hours: '7:30 AM - 8:30 PM',
    distance: '0.9 miles away',
  },
  {
    id: 5,
    name: 'Morning Bakery',
    description: 'Artisanal bakery featuring freshly baked breads, pastries, and specialty cakes made from scratch daily.',
    address: '222 Baker Street, San Francisco, CA 94115',
    image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFrZXJ5fGVufDB8fDB8fHww',
    rating: 4.9,
    categories: ['Bakery', 'Desserts', 'Coffee'],
    hours: '6:00 AM - 6:00 PM',
    distance: '1.7 miles away',
  },
  {
    id: 6,
    name: 'Gourmet Delights',
    description: 'Specialty food store offering gourmet ingredients, fine wines, cheeses, and prepared foods from around the world.',
    address: '333 Gourmet Avenue, San Francisco, CA 94109',
    image: 'https://images.unsplash.com/photo-1567071603459-41222ef21dca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z291cm1ldCUyMHN0b3JlfGVufDB8fDB8fHww',
    rating: 4.7,
    categories: ['Gourmet', 'Wine', 'Cheese', 'International'],
    hours: '9:00 AM - 8:00 PM',
    distance: '2.1 miles away',
  },
  {
    id: 7,
    name: 'Ocean Fresh Sushi',
    description: 'Specializing in fresh seafood and sushi-grade fish with daily deliveries from local fishermen.',
    address: '444 Ocean Avenue, San Francisco, CA 94112',
    image: 'https://images.unsplash.com/photo-1617651524211-23485a7aaff4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VzaGklMjBzaG9wfGVufDB8fDB8fHww',
    rating: 4.8,
    categories: ['Seafood', 'Sushi', 'Japanese'],
    hours: '10:00 AM - 9:00 PM',
    distance: '1.8 miles away',
  },
  {
    id: 8,
    name: 'Downtown Convenience',
    description: 'Neighborhood convenience store offering everyday essentials, snacks, and basic groceries with extended hours.',
    address: '555 Main Street, San Francisco, CA 94105',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29udmVuaWVuY2UlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.2,
    categories: ['Convenience', 'Snacks', 'Beverages'],
    hours: '6:00 AM - 12:00 AM',
    distance: '0.3 miles away',
  },
];

// Get all unique categories
const allCategories = [...new Set(mockStores.flatMap(store => store.categories))].sort();

export default function CustomerStores() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Filter stores
  const filteredStores = mockStores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || store.categories.includes(categoryFilter);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Stores Near You</h1>
          <p className="text-muted-foreground mt-1">
            Browse local stores and markets in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search stores..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <Button 
                    variant={!categoryFilter ? "default" : "outline"} 
                    size="sm"
                    className="mr-2 mb-2"
                    onClick={() => setCategoryFilter(null)}
                  >
                    All
                  </Button>
                  
                  <div className="flex flex-wrap">
                    {allCategories.map(category => (
                      <Button 
                        key={category}
                        variant={categoryFilter === category ? "default" : "outline"} 
                        size="sm"
                        className="mr-2 mb-2"
                        onClick={() => setCategoryFilter(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Stores Grid */}
          <div className="md:col-span-3">
            {filteredStores.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="rounded-full bg-muted p-3 mb-3">
                    <Store className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">No stores found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter(null);
                  }}>
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredStores.map(store => (
                  <Link to={`/stores/${store.id}`} key={store.id}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                            <img 
                              src={store.image} 
                              alt={store.name} 
                              className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                            />
                          </div>
                          <div className="p-4 md:p-6 md:w-2/3">
                            <div className="flex flex-col h-full justify-between">
                              <div>
                                <div className="flex justify-between mb-2">
                                  <h3 className="font-semibold text-lg">{store.name}</h3>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm ml-1">{store.rating}</span>
                                  </div>
                                </div>
                                <p className="text-muted-foreground text-sm mb-3">{store.description}</p>
                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <p>{store.address}</p>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground mb-4">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <p>{store.hours}</p>
                                </div>
                              </div>
                              <div>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {store.categories.map(category => (
                                    <Badge variant="secondary" key={category} className="text-xs">
                                      {category}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-blue-600">
                                    {store.distance}
                                  </span>
                                  <Button variant="outline" size="sm">
                                    View Store
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
