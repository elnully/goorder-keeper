
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CustomerLayout } from '@/components/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  Star, 
  ShoppingCart, 
  Truck, 
  Package2, 
  Tag,
  ChevronLeft,
  Heart
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from '@/hooks/use-toast';

// Import the mock products data from the Products.tsx page
import { mockProducts } from '@/pages/Products';

export default function CustomerProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  
  const product = mockProducts.find(p => p.id === Number(productId));
  
  if (!product) {
    return (
      <CustomerLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <Package2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} has been added to your cart`,
    });
  };

  const isOutOfStock = product.status === 'out-of-stock';
  const isLowStock = product.status === 'low-stock';

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="aspect-square relative overflow-hidden rounded-md bg-muted">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
              {product.status !== 'in-stock' && (
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className={
                    product.status === 'low-stock'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }>
                    {product.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                  </Badge>
                </div>
              )}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="px-2 py-0.5">
                  <Tag className="h-3 w-3 mr-1" />
                  {product.category}
                </Badge>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-muted-foreground">(24 reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
              <p className="text-muted-foreground mb-6">
                High-quality, fresh {product.name.toLowerCase()} sourced from local producers.
                Perfect for your daily needs with guaranteed freshness and quality.
              </p>
              
              {/* Availability */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    isOutOfStock 
                      ? 'bg-red-500' 
                      : isLowStock 
                      ? 'bg-yellow-500' 
                      : 'bg-green-500'
                  }`}></div>
                  <span className="font-medium">
                    {isOutOfStock 
                      ? 'Out of stock' 
                      : isLowStock 
                      ? `Low stock (${product.stock} available)` 
                      : 'In stock'}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 mr-1" />
                  <span>Delivery available</span>
                </div>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock || (isLowStock && quantity >= product.stock)}
                  >
                    +
                  </Button>
                </div>
                <Button 
                  className="flex-1"
                  onClick={addToCart}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              {/* SKU */}
              <div className="text-sm text-muted-foreground mb-6">
                SKU: {product.sku}
              </div>
              
              {/* Available at Stores */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Available at:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.stores.map(store => (
                    <Link to={`/stores/${store.replace(/\s+/g, '-').toLowerCase()}`} key={store}>
                      <Badge className="cursor-pointer flex items-center gap-1 transition-colors">
                        <Store className="h-3 w-3" />
                        {store}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Additional Information */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    {product.name} is a premium quality product sourced from trusted suppliers.
                    Each item undergoes strict quality checks to ensure you get only the best.
                    This product is fresh, high-quality, and perfect for your daily needs.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specifications">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Origin</span>
                      <span>California, USA</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Weight</span>
                      <span>Approx. 0.5 lb per item</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Storage</span>
                      <span>Keep refrigerated</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-muted-foreground">Shelf Life</span>
                      <span>7-10 days when properly stored</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="font-medium text-foreground">Delivery:</strong> Same-day delivery available for orders placed before 3 PM.
                    </p>
                    <p>
                      <strong className="font-medium text-foreground">Returns:</strong> Please contact customer service within 24 hours of delivery for any quality issues.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link to={`/products/${relatedProduct.id}`} className="group">
                      <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold">${relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
