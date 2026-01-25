import React from "react";

export default function Orders() {
  const handleCheckout = async () => {
    const res = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    // Redirect to Stripe Checkout
    window.location.href = data.url;
  };

  return (
    <div>
      <h1>Orders Page</h1>
      <button onClick={handleCheckout}>Pay with Stripe</button>
    </div>
  );
}
