import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('payment', JSON.stringify(formData));
    navigate('/checkout/confirmation');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Payment Information</Typography>
      <TextField
        fullWidth
        label="Card Number"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Expiry Date (MM/YY)"
        name="expiry"
        value={formData.expiry}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="CVV"
        name="cvv"
        value={formData.cvv}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Name on Card"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/checkout/delivery')}>Previous</Button>
        <Button type="submit" variant="contained">Next</Button>
      </Box>
    </Box>
  );
};

export default Payment;