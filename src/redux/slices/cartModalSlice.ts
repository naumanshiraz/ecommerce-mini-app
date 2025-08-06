import { createSlice } from '@reduxjs/toolkit'

interface CartModalState {
  isOpen: boolean
}

const initialState: CartModalState = {
  isOpen: false,
}

const cartModalSlice = createSlice({
  name: 'cartModal',
  initialState,
  reducers: {
    openCartModal: state => {
      state.isOpen = true
    },
    closeCartModal: state => {
      state.isOpen = false
    },
  },
})

export const { openCartModal, closeCartModal } = cartModalSlice.actions
export default cartModalSlice.reducer
