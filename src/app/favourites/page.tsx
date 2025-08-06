'use client'
import { useAppSelector } from '@/redux/hooks'
import { Typography, List, ListItem, ListItemText } from '@mui/material'

export default function FavouritesPage() {
  const favourites = useAppSelector(state => state.favourites.items)
  return (
    <div>
      <Typography variant="h4">❤️ Favourites</Typography>
      <List>
        {favourites.map(item => (
          <ListItem key={item.id}>
            <ListItemText primary={item.title} secondary={`$${item.price}`} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}