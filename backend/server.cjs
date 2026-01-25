// =======================
// Load ENV (FIRST LINE)
// =======================
require("dotenv").config();

// =======================
// Imports
// =======================
const express = require("express");
const mongoose = require("mongoose");
const Stripe = require("stripe");
const cors = require("cors");

// =======================
// App Init
// =======================
const app = express();

// =======================
// Middleware
// =======================
app.use(cors());

// Stripe webhook needs RAW body
app.use("/webhook", express.raw({ type: "application/json" }));

// Normal JSON for rest
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// =======================
// Stripe Init
// =======================
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// =======================
// Routes
// =======================
app.use("/admin", require("./routes/adminOrders"));
app.use("/", require("./routes/BillGenerator"));
app.use("/palz/users", require("./Users-module/users-module"));
app.use("/", require("./routes/invoice"));

const Order = require("./models/Order");

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_XXXXXXXX",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5000/cancel",
    });

    // Save order as PENDING
    await Order.create({
      stripeSessionId: session.id,
      amount: session.amount_total || 0,
      currency: session.currency,
      status: "pending",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
