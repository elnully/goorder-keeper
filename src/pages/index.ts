
// Re-export all pages to make them available for the router
export { default as Index } from './Index';
export { default as CustomerLogin } from './CustomerLogin';
export { default as CustomerProducts } from './CustomerProducts';
export { default as CustomerStores } from './CustomerStores';
export { default as CustomerProductDetail } from './CustomerProductDetail';

// Make the mock products and stores data available
export { mockProducts } from './Products';
