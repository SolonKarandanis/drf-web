export enum ApiControllers {
    AUTH='auth/token',
    USERS = 'auth/users',
    PRODUCTS = `products`,
    CART = `cart`,
    ORDERS = `orders`,
}

export const AllowedUrls = [
    `${ApiControllers.USERS}/groups`
]


