const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // =====================
    // User (Optional)
    // =====================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // guest checkout supported
    },

    // =====================
    // Stripe Identifiers
    // =====================
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    paymentIntentId: {
      type: String,
      index: true,
    },

    customerId: {
      type: String, // Stripe customer id (optional)
    },

    // =====================
    // Payment Info
    // =====================
    amount: {
      type: Number, // amount in cents
      required: true,
    },

    currency: {
      type: String,
      default: "usd",
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },

    paymentMethod: {
      type: String,
      default: "card",
    },

    // =====================
    // Purchased Items
    // =====================
    items: [
      {
        productId: String,
        name: String,
        price: Number, // per unit (cents)
        quantity: Number,
      },
    ],

    // =====================
    // Stripe Metadata
    // =====================
    stripeEventId: {
      type: String, // prevents duplicate webhook processing
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
