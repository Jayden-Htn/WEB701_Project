import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import configRoutes from './routes/configRoutes.js';

// Set up server
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()
const PORT = process.env.PORT || 5050;

// Use routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/config', configRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});