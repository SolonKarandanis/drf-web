export interface NavChild {
  title: string
  path: string
  adminOnly?: boolean
}

export interface NavItem {
  title: string
  icon: string
  path?: string
  children?: Array<NavChild>
  buyerOnly?: boolean
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    title: 'Dashboard',
    icon: 'home',
    path: 'dashboard',
  },
  {
    title: 'Products',
    icon: 'package',
    children: [
      { title: 'Search', path: 'products/search' },
      { title: 'Create', path: 'products/create' },
    ],
  },
  {
    title: 'Users',
    icon: 'users',
    children: [
      { title: 'Search', path: 'users/search' },
      { title: 'Create', path: 'users/create', adminOnly: true },
    ],
  },
  {
    title: 'Orders',
    icon: 'clipboard-list',
    path: 'orders',
  },
  {
    title: 'Cart',
    icon: 'shopping-cart',
    path: 'cart',
    buyerOnly: true,
  },
  {
    title: 'Wishlist',
    icon: 'heart',
    path: 'wishlist',
    buyerOnly: true,
  },
]
