import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FavouriteItem {
  id: number
  title: string
  price: number
  image: string
}

interface FavouriteState {
  items: FavouriteItem[]
}

const initialState: FavouriteState = {
  items: [],
}

const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id)
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id)
      } else {
        state.items.push(action.payload)
      }
    },
    clearFavourites(state) {
      state.items = []
    },
  },
})

export const {
  toggleFavourite,
  clearFavourites,
} = favouriteSlice.actions

export default favouriteSlice.reducer
