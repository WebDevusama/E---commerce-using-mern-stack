/// <reference types="vite/client" />
import React from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const Payment = () => {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const delivery = JSON.parse(localStorage.getItem("delivery") || "{}");

  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleCheckout = async () => {
    try {
      const resp = await fetch(
        `${BACKEND_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            delivery,
          }),
        }
      );

      const data = await resp.json();

      if (data?.url) {
        window.location.href = data.url; // ✅ Stripe redirect
      } else {
        alert("Failed to start checkout.");
        console.error(data);
      }
    } catch (err) {
      console.error("Checkout error", err);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Review & Pay
      </Typography>

      {/* Delivery */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Delivery Details</Typography>
        <Typography><b>Name:</b> {delivery.name}</Typography>
        <Typography>
          <b>Address:</b> {delivery.address}, {delivery.city},{" "}
          {delivery.zip}, {delivery.country}
        </Typography>
      </Paper>

      {/* Order */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Order Summary</Typography>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.title}
                secondary={`Qty: ${item.qty || 1} × $${item.price}`}
              />
              <Typography>
                ${((item.price || 0) * (item.qty || 1)).toFixed(2)}
              </Typography>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />
        <Typography variant="h6">
          <b>Total: ${totalPrice.toFixed(2)}</b>
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/checkout/confirmation")}
        >
          Back
        </Button>

        <Button
          variant="contained"
          fullWidth
          disabled={cartItems.length === 0}
          onClick={handleCheckout}
        >
          Pay with Stripe – ${totalPrice.toFixed(2)}
        </Button>
      </Box>
    </Box>
  );
};

export default Payment;
