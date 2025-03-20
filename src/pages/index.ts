
// Re-export all pages to make them available for the router
export { default as Index } from './Index';
export { default as Login } from './Login';
export { default as CustomerLogin } from './CustomerLogin';
export { default as CustomerProducts } from './CustomerProducts';
export { default as CustomerStores } from './CustomerStores';
export { default as CustomerProductDetail } from './CustomerProductDetail';
export { default as Dashboard } from './Dashboard';
export { default as Orders } from './Orders';
export { default as Products } from './Products';
export { default as Customers } from './Customers';
export { default as Settings } from './Settings';
export { default as NotFound } from './NotFound';

// Make the mock products and stores data available
export { mockProducts } from './Products';
