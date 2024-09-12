import express from 'express';
import itemController from '../controllers/itemControllers.js';

const router = express.Router();

// Route to get all items
router.get('/', itemController.getItems);

// Route to get an item's details
router.get('/:id', itemController.getItem);

// Route to add an item
router.post('/', itemController.addItem);

// Route to delete an item
router.delete('/', itemController.deleteItem);

// Route to update an item
router.put('/', itemController.updateItem);

// Route to purchase an item
router.patch('/:id', itemController.purchaseItem);

export default router;