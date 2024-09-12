// Get all items
const getItems = async (req, res) => {
    try {
        const result = "Getting all items"
        res.send(result).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get an item's details
const getItem = async (req, res) => {
    try {
        const result = "Getting item details"
        res.send(result).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Adding a new item
const addItem = async (req, res) => {
    try {
        const result = "Adding new item"
        res.send(result).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Adding a new item
const deleteItem = async (req, res) => {
    try {
        const result = "Deleting an item"
        res.send(result).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Adding a new item
const updateItem = async (req, res) => {
    try {
        const result = "Updating an item"
        res.send(result).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Adding a new item
const purchaseItem = async (req, res) => {
    try {
        const result = "Purchasing an item"
        res.send(result).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export default {
    getItems,
    getItem,
    addItem,
    deleteItem,
    updateItem,
    purchaseItem
};

