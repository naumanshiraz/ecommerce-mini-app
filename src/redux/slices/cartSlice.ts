import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload
      const existingItem = state.items.find(i => i.id === item.id)

       const qtyToAdd = item.quantity ?? 1;

      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
         state.items.push({ ...item, quantity: qtyToAdd });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    increaseQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },
    decreaseQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
