export enum ApiControllers {
  AUTH = 'auth/token',
  USERS = 'auth/users',
  PRODUCTS = 'products',
  CART = 'cart',
  ORDERS = 'orders',
  SOCIALS = 'socials',
  WISHLIST = 'wishlist',
}

// Endpoint NAMES (not URLs) that should be called without an Authorization header.
// Used in apiSlice prepareHeaders: !AllowedUrls.includes(endpoint)
export const AllowedUrls = ['getAllGroups']
