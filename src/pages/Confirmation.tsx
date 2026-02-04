import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider, TextField, Paper } from '@mui/material';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const delivery = JSON.parse(localStorage.getItem('delivery') || '{}');

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = () => {
    if (!paymentData.cardNumber || !paymentData.cardHolder || !paymentData.expiryDate || !paymentData.cvv) {
      alert('Please fill in all payment details');
      return;
    }
    // Save payment data to localStorage
    localStorage.setItem('payment', JSON.stringify(paymentData));
    // Navigate to payment page
    navigate('/checkout/payment');
  };

  const handlePlaceOrder = () => {
    // Here, send order to backend
    alert('Order placed successfully!');
    clearCart();
    localStorage.removeItem('delivery');
    localStorage.removeItem('payment');
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>Order Confirmation</Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Delivery Information</Typography>
        <Typography><strong>Name:</strong> {delivery.name || 'N/A'}</Typography>
        <Typography><strong>Address:</strong> {delivery.address || 'N/A'}</Typography>
        <Typography><strong>City:</strong> {delivery.city || 'N/A'}</Typography>
        <Typography><strong>Zip:</strong> {delivery.zip || 'N/A'}</Typography>
        <Typography><strong>Country:</strong> {delivery.country || 'N/A'}</Typography>
      </Paper>
      
      <Divider sx={{ my: 2 }} />
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Payment Information</Typography>
        <TextField
          fullWidth
          label="Card Holder Name"
          name="cardHolder"
          value={paymentData.cardHolder}
          onChange={handlePaymentChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Card Number"
          name="cardNumber"
          value={paymentData.cardNumber}
          onChange={handlePaymentChange}
          placeholder="1234 5678 9012 3456"
          margin="normal"
          required
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
          <TextField
            label="Expiry Date (MM/YY)"
            name="expiryDate"
            value={paymentData.expiryDate}
            onChange={handlePaymentChange}
            placeholder="MM/YY"
            required
          />
          <TextField
            label="CVV"
            name="cvv"
            value={paymentData.cvv}
            onChange={handlePaymentChange}
            placeholder="123"
            type="password"
            required
          />
        </Box>
      </Paper>
      
      <Divider sx={{ my: 2 }} />
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Order Summary</Typography>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.title} secondary={`Qty: ${item.qty} x $${item.price}`} />
              <Typography>${(item.price * item.qty).toFixed(2)}</Typography>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6"><strong>Total: ${totalPrice.toFixed(2)}</strong></Typography>
      </Paper>
      
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={() => navigate('/checkout/delivery')}>Back to Delivery</Button>
        <Button variant="contained" onClick={handleProceedToPayment}>Proceed to Payment</Button>
      </Box>
    </Box>
  );
};

export default Confirmation;