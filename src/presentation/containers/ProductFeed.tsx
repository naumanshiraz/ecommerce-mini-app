'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import ProductList from '../components/ProductList'

export default function ProductFeed() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3001/products')
      return res.data
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Failed to load products.</div>

  return <ProductList products={data} />
}
