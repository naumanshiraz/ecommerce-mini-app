'use client'

import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  Divider,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Image from 'next/image'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { removeFromFavourites } from '@/redux/slices/favouriteSlice'

export default function FavouritesPage() {
  const dispatch = useAppDispatch()
  const favourites = useAppSelector(state => state.favourites.items)

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Favourites
        </Typography>

        <Link href="/" passHref>
          <Button variant="outlined">Back to Home</Button>
        </Link>
      </Box>

      {favourites.length === 0 ? (
        <Typography>You haven’t added any favourites yet.</Typography>
      ) : (
        <Stack spacing={3}>
          {favourites.map(item => (
            <Stack
              key={item.id}
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ borderBottom: '1px solid #ddd', pb: 2 }}
            >
              <Image src={item.image} alt={item.title} width={80} height={80} />
              <Stack flex={1}>
                <Typography fontWeight="bold">{item.title}</Typography>
                <Typography color="text.secondary">${item.price}</Typography>
              </Stack>
              <IconButton
                onClick={() => dispatch(removeFromFavourites(item.id))}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  )
}
