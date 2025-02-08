const express = require("express");
const router = express.Router();
const shoppingListController = require("../controllers/shoppingListController");
const authorize = require("../middlewares/authorize");
const validate = require("../middlewares/validate");

// Get all shopping lists the user has access to
router.get("/", shoppingListController.getAllLists);

// Create a new shopping list (only the owner can do this)
router.post("/", authorize, validate, shoppingListController.createList);

// Get details of a specific shopping list
router.get("/:id", authorize, shoppingListController.getListById);

// Delete a shopping list (only the owner can do this)
router.delete("/:id", authorize, shoppingListController.deleteList);

// Invite a user to a shopping list
router.post("/:id/invite", authorize, shoppingListController.inviteUser);

// Manage items in a shopping list
router.get("/:id/items", authorize, shoppingListController.getItems);
router.post("/:id/items", authorize, validate, shoppingListController.addItem);
router.delete("/:id/items/:itemId", authorize, shoppingListController.removeItem);
router.patch("/:id/items/:itemId/complete", authorize, shoppingListController.completeItem);

module.exports = router;