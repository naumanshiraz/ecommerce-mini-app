'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import ProductList from '../components/ProductList'
import { Box, CircularProgress, Typography } from '@mui/material'

export default function ProductFeed() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3001/products')
      return res.data
    },
  })

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography color="error">Failed to load products.</Typography>
      </Box>
    )
  }

  return <ProductList products={data} />
}
