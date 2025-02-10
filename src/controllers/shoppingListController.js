const { v4: uuidv4 } = require("uuid");

const shoppingLists = []; // Temporary storage

const getShoppingLists = (req, res) => {
    res.json({ shoppingLists });
};

const createShoppingList = (req, res) => {
    const { title, ownerId } = req.body;

    if (!title || !ownerId) {
        return res.status(400).json({ error: "Missing required fields: title, ownerId" });
    }

    const newShoppingList = {
        id: uuidv4(),
        title,
        ownerId,
        members: [ownerId],
        items: []
    };

    shoppingLists.push(newShoppingList);
    res.status(201).json(newShoppingList);
};

const getShoppingListById = (req, res) => {
    const { id } = req.params;
    const shoppingList = shoppingLists.find(list => list.id === id);

    if (!shoppingList) {
        return res.status(404).json({ error: "Shopping list not found" });
    }

    res.json(shoppingList);
};

const deleteShoppingList = (req, res) => {
    const { id } = req.params;
    const index = shoppingLists.findIndex(list => list.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Shopping list not found" });
    }

    shoppingLists.splice(index, 1);
    res.json({ message: "Shopping list deleted successfully" });
};

const inviteUserToShoppingList = (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    const shoppingList = shoppingLists.find(list => list.id === id);

    if (!shoppingList) {
        return res.status(404).json({ error: "Shopping list not found" });
    }

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    if (!shoppingList.members.includes(userId)) {
        shoppingList.members.push(userId);
    }

    res.json(shoppingList);
};

const getShoppingListItems = (req, res) => {
    const { id } = req.params;
    const shoppingList = shoppingLists.find(list => list.id === id);

    if (!shoppingList) {
        return res.status(404).json({ error: "Shopping list not found" });
    }

    res.json({ items: shoppingList.items });
};

const addItemToShoppingList = (req, res) => {
    const { id } = req.params;
    const { itemName } = req.body;
    const shoppingList = shoppingLists.find(list => list.id === id);

    if (!shoppingList) {
        return res.status(404).json({ error: "Shopping list not found" });
    }

    if (!itemName) {
        return res.status(400).json({ error: "Item name is required" });
    }

    const newItem = {
        itemId: uuidv4(),
        name: itemName,
        isResolved: false
    };

    shoppingList.items.push(newItem);
    res.status(201).json(newItem);
};

const removeItemFromShoppingList = (req, res) => {
    const { id, itemId } = req.params;
    const shoppingList = shoppingLists.find(list => list.id === id);

    if (!shoppingList) {
        return res.status(404).json({ error: "Shopping list not found" });
    }

    const itemIndex = shoppingList.items.findIndex(item => item.itemId === itemId);
    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
    }

    shoppingList.items.splice(itemIndex, 1);
    res.json({ message: "Item removed successfully" });
};

const markItemAsCompleted = (req, res) => {
    const { id, itemId } = req.params;
    const shoppingList = shoppingLists.find(list => list.id === id);

    if (!shoppingList) {
        return res.status(404).json({ error: "Shopping list not found" });
    }

    const item = shoppingList.items.find(item => item.itemId === itemId);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }

    item.isResolved = true;
    res.json(item);
};

module.exports = {
    getShoppingLists,
    createShoppingList,
    getShoppingListById,
    deleteShoppingList,
    inviteUserToShoppingList,
    getShoppingListItems,
    addItemToShoppingList,
    removeItemFromShoppingList,
    markItemAsCompleted
};