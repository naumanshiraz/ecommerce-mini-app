import Grid from '@mui/material/Grid'
import ProductCard from './ProductCard'

export default function ProductList({ products }: { products: any[] }) {
  return (
    <Grid container spacing={2}>
      {products.map(product => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}