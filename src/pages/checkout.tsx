import React, { FunctionComponent, useEffect } from "react";
import { Box, Paper, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
// Note: this component does not require Stripe.js to redirect
// to a Checkout session URL returned by the backend.

import CheckoutRoutes from "../routes/checkout-routes";

// Stripe client library is optional here — the backend returns a
// session URL and we perform a simple redirect. If you need
// Stripe.js features (e.g. Elements) provide `VITE_STRIPE_PUBLISHABLE_KEY`.

 

// ===============================
// Component
// ===============================
export const Checkout: FunctionComponent = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Checkout route changed:", location.pathname);
  }, [location.pathname]);

  // ===============================
  // Handle Checkout
  // ===============================
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const session = await response.json();

      if (!session.url) {
        toast.error("Failed to create checkout session");
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <CheckoutRoutes />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCheckout}
          sx={{ mt: 3 }}
        >
          Pay with Stripe
        </Button>

      </Box>
    </Paper>
  );
};

export default Checkout;
