'use client'
import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Badge, Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { openCartModal } from '@/redux/slices/cartModalSlice'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/navigation';
import { useLang } from '@/presentation/context/LanguageContext'


const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.items)
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const { t, lang, changeLang } = useLang()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>
        <IconButton color="inherit" onClick={() => router.push('/favourites')}>
          <FavoriteBorderIcon />
        </IconButton>

        <IconButton color="inherit" onClick={() => dispatch(openCartModal())}>
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <Button sx={{color: '#fff',}} onClick={() => changeLang(lang === 'en' ? 'ur' : 'en')}>
          {lang === 'en' ? 'FR' : 'EN'}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
