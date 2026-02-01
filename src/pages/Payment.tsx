import React from 'react';
import { Box, Button, Typography, List, ListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const Payment = () => {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const backend = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      const resp = await fetch(`${backend}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await resp.json();
      if (data && data.url) {
        // Redirect user to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('No session URL returned', data);
        alert('Failed to initiate checkout.');
      }
    } catch (err) {
      console.error('Checkout error', err);
      alert('Checkout error. See console for details.');
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Review & Pay</Typography>

      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            {item.title} x {item.qty} — ${((item.price || 0) * (item.qty || 1)).toFixed(2)}
          </ListItem>
        ))}
      </List>

      <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
        <Button variant="contained" onClick={handleCheckout} disabled={cartItems.length === 0}>
          Pay with Stripe
        </Button>
      </Box>
    </Box>
  );
};

export default Payment;