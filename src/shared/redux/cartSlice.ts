import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { Cart, UpdateItemRequest } from '#/models/cart.models'

interface CartState {
  cart: Cart | null
  totalCartValue: number
  updateRequests: Array<UpdateItemRequest>
}

const initialState: CartState = {
  cart: null,
  totalCartValue: 0,
  updateRequests: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload
      state.totalCartValue = action.payload.totalPrice
    },
    resetCart(state) {
      state.cart = null
      state.totalCartValue = 0
    },
    resetUpdateRequests(state) {
      state.updateRequests = []
    },
    mutateQuantity(
      state,
      action: PayloadAction<{ cartItemId: number; quantity: number }>,
    ) {
      const { cartItemId, quantity } = action.payload
      const cart = state.cart
      if (!cart) return

      const item = cart.cartItems.find((i) => i.id === cartItemId)
      if (item) {
        item.totalPrice = quantity * item.unitPrice
        item.quantity = quantity
        cart.totalPrice = cart.cartItems.reduce((sum, i) => sum + i.totalPrice, 0)
        state.totalCartValue = cart.totalPrice
      }

      const existing = state.updateRequests.find((r) => r.cartItemId === cartItemId)
      if (existing) {
        existing.quantity = quantity
      } else {
        const productId = cart.cartItems.find((i) => i.id === cartItemId)?.productId ?? 0
        state.updateRequests.push({ cartItemId, productId, quantity })
      }
    },
  },
})

export const { setCart, resetCart, resetUpdateRequests, mutateQuantity } = cartSlice.actions
export default cartSlice.reducer

const selectCartState = (state: RootState) => state.cart

export const cartSelector = createSelector(selectCartState, (s) => s.cart)
export const cartItemsSelector = createSelector(cartSelector, (c) => c?.cartItems)
export const cartTotalSelector = createSelector(selectCartState, (s) => s.totalCartValue)
export const cartItemCountSelector = createSelector(cartItemsSelector, (items) => items?.length ?? 0)
export const cartUpdateRequestsSelector = createSelector(selectCartState, (s) => s.updateRequests)
