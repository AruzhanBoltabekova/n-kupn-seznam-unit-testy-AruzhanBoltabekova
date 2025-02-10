const express = require("express");
const router = express.Router();
const shoppingListController = require("../controllers/shoppingListController");

// Endpoints
router.get("/shopping-lists", shoppingListController.getShoppingLists);
router.post("/shopping-lists", shoppingListController.createShoppingList);
router.get("/shopping-lists/:id/view", shoppingListController.getShoppingListById);
router.delete("/shopping-lists/:id", shoppingListController.deleteShoppingList);
router.post("/shopping-lists/:id/invite", shoppingListController.inviteUserToShoppingList);
router.get("/shopping-lists/:id/items", shoppingListController.getShoppingListItems);
router.post("/shopping-lists/:id/items", shoppingListController.addItemToShoppingList);
router.delete("/shopping-lists/:id/items/:itemId", shoppingListController.removeItemFromShoppingList);
router.patch("/shopping-lists/:id/items/:itemId/complete", shoppingListController.markItemAsCompleted);
router.get("/shopping-lists/:id", shoppingListController.getShoppingListById);
router.patch("/shopping-lists/:id", shoppingListController.updateShoppingList);
module.exports = router;