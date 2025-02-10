const express = require("express");
const shoppingListRoutes = require("./routes/shoppingList");

const app = express();
const PORT = process.env.PORT || 9001;

app.use(express.json());
app.use("/api", shoppingListRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});