
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageLayout } from "@/components/PageLayout";
import { CustomerLayout } from "@/components/CustomerLayout";
import {
  Index,
  Login,
  Dashboard,
  Products,
  Orders,
  Customers,
  Settings,
  CustomerLogin,
  CustomerProducts,
  CustomerStores,
  CustomerProductDetail,
  NotFound
} from "@/pages";
import Register from "@/pages/Register";
import Cart from "@/pages/Cart";
import OrderSuccess from "@/pages/OrderSuccess";

import "./App.css";

// Initialize the QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer-login" element={<CustomerLogin />} />
            <Route path="/register" element={<Register />} />
            
            {/* Customer Routes - Wrapped in CustomerLayout */}
            <Route path="/" element={<CustomerLayout />}>
              <Route path="/products" element={<CustomerProducts />} />
              <Route path="/stores" element={<CustomerStores />} />
              <Route path="/products/:id" element={<CustomerProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Route>
            
            {/* Admin Routes - Protected and wrapped in PageLayout */}
            <Route path="/" element={<ProtectedRoute><PageLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-center" />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
