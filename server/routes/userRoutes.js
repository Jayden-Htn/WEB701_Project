import express from 'express';
import userController from '../controllers/userControllers.js';

const router = express.Router();

// Route to get all users
router.get('/', userController.getUsers);

// Route to login a user
router.get('/:id', userController.loginUser);

// Route to register a new user
router.post('/', userController.registerUser);

// Route to update a user
router.put('/:id', userController.updateUser);

// Route to delete a user
router.delete('/:id', userController.deleteUser);

// Route to update tokens
router.patch('/:id', userController.updateTokens);

// Update cart
router.put('/cart/:id', userController.updateCart);

// Update history
router.put('/history/:id', userController.updateHistory);

export default router;
