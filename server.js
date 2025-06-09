import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './Routes/contactRoutes.js';
import connectDB from './config/db.config.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
