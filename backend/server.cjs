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

// ⚠️ Stripe webhook requires RAW body
app.use("/webhook", express.raw({ type: "application/json" }));

// Normal JSON for other routes
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
// Database
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// =======================
// Models
// =======================
const Order = require("./models/Order");

// =======================
// Routes
// =======================
app.use("/admin", require("./routes/adminOrders"));
app.use("/", require("./routes/BillGenerator"));
app.use("/palz/users", require("./Users-module/users-module"));
app.use("/", require("./routes/invoice"));


// =======================
// Create Checkout Session
// =======================
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title || `Product ${item.id}`,
        },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.qty || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url:
        process.env.CLIENT_SUCCESS_URL ||
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url:
        process.env.CLIENT_CANCEL_URL || "http://localhost:3000/cancel",
    });

    // Save order as PENDING (include items for reference)
    await Order.create({
      stripeSessionId: session.id,
      amount: session.amount_total || 0,
      currency: session.currency,
      status: "PENDING",
      items,
    });

    res.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});


// =======================
// Stripe Webhook
// =======================
app.post("/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle Events
  switch (event.type) {
    case "checkout.session.completed":
      handlePaymentSuccess(event.data.object);
      break;

    case "checkout.session.expired":
      handlePaymentFailure(event.data.object);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// =======================
// Webhook Helpers
// =======================
async function handlePaymentSuccess(session) {
  await Order.findOneAndUpdate(
    { stripeSessionId: session.id },
    {
      status: "PAID",
      paymentIntentId: session.payment_intent,
    }
  );
  console.log("Payment successful:", session.id);
}

async function handlePaymentFailure(session) {
  await Order.findOneAndUpdate(
    { stripeSessionId: session.id },
    { status: "FAILED" }
  );
  console.log("Payment failed:", session.id);
}

// =======================
// Server
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
