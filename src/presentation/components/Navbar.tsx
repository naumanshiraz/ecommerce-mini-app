'use client'
import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { openCartModal } from '@/redux/slices/cartModalSlice'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.items)
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>
        <IconButton color="inherit" onClick={() => dispatch(openCartModal())}>
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
