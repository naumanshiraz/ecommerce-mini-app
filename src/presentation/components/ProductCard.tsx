'use client'
import { Card, CardContent, CardMedia, Typography, Button, Stack, IconButton} from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addToCart } from '@/redux/slices/cartSlice'
import { addToFavourites } from '@/redux/slices/favouriteSlice'
import { useRouter } from 'next/navigation'
import CartModal from './CartModal'
import { useSnackbar } from '@/presentation/providers/SnackbarProvider'
import { useLang } from '@/presentation/context/LanguageContext'

interface Props {
  product: {
    id: number
    title: string
    price: number
    image: string
  }
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const showSnackbar = useSnackbar()

  const { t } = useLang()

  const favourites = useAppSelector(state => state.favourites.items)
  const isFavourite = favourites.some(item => item.id === product.id)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    showSnackbar(t('added_to_cart'))
  }

  const handleAddToFavourites = () => {
    dispatch(addToFavourites(product))
    showSnackbar(t('added_to_favourites'))
  }

  return (
    <Card sx={{ width: '100%', maxWidth: 300, mx: 'auto' }}>
      <CardMedia
        component="img"
        height="320"
        image={product.image}
        alt={product.title}
        style={{ cursor: 'pointer' }}
        onClick={() => router.push(`/product/${product.id}`)}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent>
        <Typography gutterBottom component="div" variant="subtitle1" fontWeight="bold" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        <Stack direction="row" spacing={1} mt={2}>
          <Button variant="outlined" size="small" onClick={handleAddToCart}>
            {t('add_to_cart')}
          </Button>
          <IconButton
            size="small"
            onClick={handleAddToFavourites}
            sx={{ color: isFavourite ? 'red' : 'black', border: '1px solid', borderColor: isFavourite ? 'red' : 'black' }}
          >
            {isFavourite ? '❤️' : '🖤'}
          </IconButton>
        </Stack>
        
      </CardContent>
      <CartModal open={open} onClose={() => setOpen(false)} productTitle={product.title} />
    </Card>
  )
}

export default ProductCard