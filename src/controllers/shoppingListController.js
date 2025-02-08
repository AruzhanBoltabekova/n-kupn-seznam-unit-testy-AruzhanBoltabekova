const { v4: uuidv4 } = require("uuid");
const shoppingListDB = require("../data/shoppingList");

// Get all shopping lists
exports.getAllLists = (req, res) => {
    res.json(shoppingListDB);
};

// Create a new shopping list
exports.createList = (req, res) => {
    const { name, ownerId } = req.body;
    if (!name || !ownerId) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const newList = {
        listId: uuidv4(),
        name,
        ownerId,
        members: [ownerId],
        items: []
    };
    shoppingListDB.push(newList);
    res.status(201).json(newList);
};

// Get a specific shopping list by ID
exports.getListById = (req, res) => {
    const list = shoppingListDB.find(l => l.listId === req.params.id);
    if (!list) return res.status(404).json({ error: "Shopping list not found" });
    res.json(list);
};

// Delete a shopping list
exports.deleteList = (req, res) => {
    const index = shoppingListDB.findIndex(l => l.listId === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Shopping list not found" });
    shoppingListDB.splice(index, 1);
    res.json({ message: "Shopping list deleted successfully" });
};

// Invite a user to a shopping list
exports.inviteUser = (req, res) => {
    const list = shoppingListDB.find(l => l.listId === req.params.id);
    if (!list) return res.status(404).json({ error: "Shopping list not found" });

    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    if (!list.members.includes(userId)) {
        list.members.push(userId);
    }
    res.json(list);
};

// Get all items in a shopping list
exports.getItems = (req, res) => {
    const list = shoppingListDB.find(l => l.listId === req.params.id);
    if (!list) return res.status(404).json({ error: "Shopping list not found" });
    res.json(list.items);
};

// Add a new item to a shopping list
exports.addItem = (req, res) => {
    const list = shoppingListDB.find(l => l.listId === req.params.id);
    if (!list) return res.status(404).json({ error: "Shopping list not found" });

    const { itemName } = req.body;
    if (!itemName) {
        return res.status(400).json({ error: "Item name is required" });
    }

    const newItem = {
        itemId: uuidv4(),
        name: itemName,
        isCompleted: false
    };
    list.items.push(newItem);
    res.json(list);
};

// Remove an item from a shopping list
exports.removeItem = (req, res) => {
    const list = shoppingListDB.find(l => l.listId === req.params.id);
    if (!list) return res.status(404).json({ error: "Shopping list not found" });

    list.items = list.items.filter(item => item.itemId !== req.params.itemId);
    res.json(list);
};

// Mark an item as completed
exports.completeItem = (req, res) => {
    const list = shoppingListDB.find(l => l.listId === req.params.id);
    if (!list) return res.status(404).json({ error: "Shopping list not found" });

    const item = list.items.find(item => item.itemId === req.params.itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.isCompleted = true;
    res.json(list);
};