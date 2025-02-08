const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());

// Import routes
const shoppingListRoutes = require("./routes/shoppingList");

// Use shopping list routes
app.use("/api/shopping-lists", shoppingListRoutes);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));