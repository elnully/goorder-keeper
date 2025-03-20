
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, MapPin } from 'lucide-react';
import { mockProducts } from './Products';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  store: string;
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('goorder-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart data:', error);
        localStorage.removeItem('goorder-cart');
      }
    } else {
      // Demo data for first-time users
      const demoCart = [
        {
          id: mockProducts[0].id,
          name: mockProducts[0].name,
          price: mockProducts[0].price,
          image: mockProducts[0].image,
          quantity: 1,
          store: mockProducts[0].store
        },
        {
          id: mockProducts[3].id,
          name: mockProducts[3].name,
          price: mockProducts[3].price,
          image: mockProducts[3].image,
          quantity: 2,
          store: mockProducts[3].store
        }
      ];
      setCartItems(demoCart);
      localStorage.setItem('goorder-cart', JSON.stringify(demoCart));
    }
  }, []);

  // Update quantity of an item
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('goorder-cart', JSON.stringify(updatedCart));
  };

  // Remove an item from cart
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('goorder-cart', JSON.stringify(updatedCart));
    toast.success('Item removed from cart');
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Delivery fee calculation based on subtotal
  const deliveryFee = subtotal > 50 ? 0 : 4.99;
  
  // Calculate total
  const total = subtotal + deliveryFee;

  // Handle checkout
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call to process order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart after successful checkout
      localStorage.removeItem('goorder-cart');
      setCartItems([]);
      
      toast.success('Order placed successfully!');
      navigate('/order-success');
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Checkout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <Button variant="outline" asChild>
          <Link to="/products">
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <Card className="mt-8 text-center p-12">
          <div className="flex flex-col items-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-32 h-32 bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium mb-1 text-lg">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" /> {item.store}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            ${(item.price * item.quantity).toFixed(2)} total
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {subtotal < 50 && (
                    <p className="text-green-600">
                      Add ${(50 - subtotal).toFixed(2)} more to get free delivery
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleCheckout}
                  disabled={isLoading || cartItems.length === 0}
                >
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="flex items-center mb-2">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Free delivery on orders over $50
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Delivery available to your saved addresses
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
