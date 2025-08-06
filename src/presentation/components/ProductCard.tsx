import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

interface Props {
  product: {
    id: number
    title: string
    price: number
    image: string
  }
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" height="140" image={product.image} alt={product.title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCard