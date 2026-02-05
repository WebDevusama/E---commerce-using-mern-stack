import React, { FunctionComponent, useEffect } from "react";
import { Box, Paper, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import CheckoutRoutes from "../routes/checkout-routes";

// ===============================
// Component
// ===============================
export const Checkout: FunctionComponent = () => {
  const location = useLocation();

  // ✅ Example total amount (replace with cart total)
  const totalAmount = 100; // USD

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount, // ✅ REQUIRED
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Checkout session failed");
      }

      const session = await response.json();

      if (!session.url) {
        toast.error("Stripe session URL missing");
        return;
      }

      // ✅ Redirect to Stripe Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Payment failed. Please try again.");
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
