'use client'
import { Card, CardContent, CardMedia, Typography, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { addToCart } from '@/redux/slices/cartSlice'
import { toggleFavourite } from '@/redux/slices/favouriteSlice'
import { useRouter } from 'next/navigation'
import CartModal from './CartModal'
import { useSnackbar } from '@/presentation/providers/SnackbarProvider'

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

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    showSnackbar('Added to cart!')
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
            Add to Cart
          </Button>
          <Button variant="outlined" size="small" onClick={() => dispatch(toggleFavourite(product))}>
            ❤️
          </Button>
        </Stack>
      </CardContent>
      <CartModal open={open} onClose={() => setOpen(false)} productTitle={product.title} />
    </Card>
  )
}

export default ProductCard