import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Delivery = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage or context
    localStorage.setItem('delivery', JSON.stringify(formData));
    navigate('/checkout/confirmation');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Delivery Information</Typography>
      <TextField
        fullWidth
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Zip Code"
        name="zip"
        value={formData.zip}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Next</Button>
    </Box>
  );
};

export default Delivery;