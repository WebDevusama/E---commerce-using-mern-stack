const express = require("express");
const Order = require("../Users-module/order");
const generateInvoice = require("../utils/invoiceGenerator");
const router = express.Router();

router.get("/invoice/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("Order not found");

    generateInvoice(res, order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
