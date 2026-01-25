import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const delivery = JSON.parse(localStorage.getItem('delivery') || '{}');
  const payment = JSON.parse(localStorage.getItem('payment') || '{}');

  const handlePlaceOrder = () => {
    // Here, send order to backend
    alert('Order placed successfully!');
    clearCart();
    localStorage.removeItem('delivery');
    localStorage.removeItem('payment');
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Order Confirmation</Typography>
      
      <Typography variant="h6">Delivery Information</Typography>
      <Typography>{delivery.name}</Typography>
      <Typography>{delivery.address}, {delivery.city}, {delivery.zip}, {delivery.country}</Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6">Payment Information</Typography>
      <Typography>Card ending in {payment.cardNumber?.slice(-4)}</Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography variant="h6">Order Summary</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.title} secondary={`Qty: ${item.qty} x $${item.price}`} />
            <Typography>${(item.price * item.qty).toFixed(2)}</Typography>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/checkout/payment')}>Previous</Button>
        <Button variant="contained" onClick={handlePlaceOrder}>Place Order</Button>
      </Box>
    </Box>
  );
};

export default Confirmation;