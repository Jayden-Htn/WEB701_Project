import express from 'express';
import configController from '../controllers/configControllers.js';

const router = express.Router();

// Route to get config
router.get('/', configController.getConfig);

// Route to update config
router.put('/', configController.updateConfig);

export default router;