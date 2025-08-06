import axios from 'axios'
import { Typography, Card, CardMedia, CardContent } from '@mui/material'
import { notFound } from 'next/navigation'

interface Product {
  id: number
  title: string
  price: number
  image: string
  description: string
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  try {
    const res = await axios.get<Product>(`http://localhost:3001/products/${params.id}`)
    const product = res.data

    return (
      <Card sx={{ display: 'flex', height: 350, mt: 4 }} >
        <CardMedia
          component="img"
          sx={{ width: 350, objectFit: 'cover' }}
          image={product.image}
          alt={product.title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5">{product.title}</Typography>
          <Typography>${product.price}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    )
  } catch (err) {
    return notFound()
  }
}
