
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Store, Map, Phone } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    document.title = 'GoOrder - Online Shopping';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
              Shop Easily with GoOrder
            </h1>
            <p className="text-lg mb-8 opacity-90 max-w-md animate-fadeIn animation-delay-100">
              Discover thousands of products from local stores and get them delivered to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-200">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold"
                asChild
              >
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/stores">
                  Browse Stores <Store className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end animate-fadeIn animation-delay-300">
            <img 
              src="/lovable-uploads/e179501c-7edb-46f0-a140-c2fe1a48389a.png" 
              alt="GoOrder" 
              className="w-64 md:w-80 p-4 bg-white rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose GoOrder?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Huge Selection</h3>
              <p className="text-muted-foreground">
                Shop thousands of products from local stores all in one place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Stores</h3>
              <p className="text-muted-foreground">
                Support businesses in your community with every purchase.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Login</h3>
              <p className="text-muted-foreground">
                Simple phone number authentication for quick access.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of satisfied customers who shop with GoOrder every day.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            asChild
          >
            <Link to="/products">
              Explore Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold mb-4">GoOrder</h3>
              <p className="text-gray-400 max-w-xs">
                Your one-stop shop for groceries, essentials, and more from local stores.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Shop</h4>
                <ul className="space-y-2">
                  <li><Link to="/products" className="text-gray-400 hover:text-white">All Products</Link></li>
                  <li><Link to="/stores" className="text-gray-400 hover:text-white">Stores</Link></li>
                  <li><Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Account</h4>
                <ul className="space-y-2">
                  <li><Link to="/login" className="text-gray-400 hover:text-white">Sign In</Link></li>
                  <li><Link to="/register" className="text-gray-400 hover:text-white">Register</Link></li>
                  <li><Link to="/orders" className="text-gray-400 hover:text-white">Your Orders</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Support</h4>
                <ul className="space-y-2">
                  <li><Link to="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                  <li><Link to="/about" className="text-gray-400 hover:text-white">About GoOrder</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} GoOrder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
