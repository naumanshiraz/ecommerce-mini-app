'use client'
import { Card, CardContent, CardMedia, Typography, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
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

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    showSnackbar(t('added_to_cart'))
  }

  const handleAddToFavourites = () => {
    dispatch(addToFavourites(product))
    showSnackbar(t('added_to_favourites'))
  }

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="320"
        image={product.image}
        alt={product.title}
        style={{ cursor: 'pointer' }}
        onClick={() => router.push(`/product/${product.id}`)}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        <Stack direction="row" spacing={1} mt={2}>
          <Button variant="outlined" size="small" onClick={handleAddToCart}>
            {t('add_to_cart')}
          </Button>
          <Button variant="outlined" size="small" onClick={handleAddToFavourites}>
            ❤️
          </Button>
        </Stack>
      </CardContent>
      <CartModal open={open} onClose={() => setOpen(false)} productTitle={product.title} />
    </Card>
  )
}

export default ProductCard