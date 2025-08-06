'use client'

import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Stack,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '@/redux/slices/cartSlice'
import { closeCartModal } from '@/redux/slices/cartModalSlice'

const CartModal = () => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(state => state.cartModal.isOpen)
  const cartItems = useAppSelector(state => state.cart.items)

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  )

  return (
    <Dialog open={isOpen} onClose={() => dispatch(closeCartModal())} fullWidth>
      <DialogTitle>
        Shopping Cart
        <IconButton
          onClick={() => dispatch(closeCartModal())}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          cartItems.map(item => (
            <Stack
              key={item.id}
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Image src={item.image} alt={item.title} width={60} height={60} />
              <Stack flex={1}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2">${item.price}</Typography>
                <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
              <IconButton onClick={() => dispatch(removeFromCart(item.id))}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))
        )}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeCartModal())}>Close</Button>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CartModal
