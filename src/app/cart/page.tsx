'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart } from '@/redux/slices/cartSlice';
import { Button, Container, Typography, Box, Card, CardMedia, CardContent } from '@mui/material';

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        cartItems.map(item => (
          <Card key={item.id} sx={{ display: 'flex', mb: 2 }}>
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              sx={{ width: 100 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>Price: ${item.price}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
              </CardContent>
            </Box>
            <Box sx={{ m: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </Button>
            </Box>
          </Card>
        ))
      )}
    </Container>
  );
};

export default CartPage;
