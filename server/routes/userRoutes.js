import express from 'express';
import userController from '../controllers/userControllers.js';
// const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to register a new user
router.post('/', userController.registerUser);

// Route to login a user
router.get('/', userController.loginUser);

// Route to update a user
router.put('/:id', userController.updateUser);

// Route to delete a user
router.delete('/:id', userController.deleteUser);

// Route to update tokens
router.patch('/:id', userController.updateTokens);

export default router;
