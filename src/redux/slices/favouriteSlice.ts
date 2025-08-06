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
    addToFavourites(state, action: PayloadAction<FavouriteItem>) {
      const item = action.payload
      if (!state.items.find(i => i.id === item.id)) {
        state.items.push(item)
      }
    },
    removeFromFavourites(state, action: PayloadAction<number>) {
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
