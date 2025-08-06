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
    addToFavourites: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeFromFavourites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearFavourites(state) {
      state.items = []
    },
  },
})

export const {
  addToFavourites,
  removeFromFavourites,
  clearFavourites,
} = favouriteSlice.actions

export default favouriteSlice.reducer
