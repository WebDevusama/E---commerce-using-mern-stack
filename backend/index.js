require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./Users-module/users-module");
const EmployeeModel = require("./Users-module/Employee");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug env (TEMP – remove later)
console.log("MONGO_URI:", process.env.MONGO_URI);

// Auth routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await EmployeeModel.findOne({ email });
  if (!user) return res.json("No record existed");

  if (user.password !== password)
    return res.json("The password is incorrect");

  res.json("Success");
});

app.post("/register", async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    res.json(employee);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// User routes
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ Mongo error:", err.message));
