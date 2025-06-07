import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// GET all contacts
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all contacts' });
});

router.post("/", (req, res) => {
    
    
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
    }

    const { name, email, phone } = req.body;
    
    if (!name || !email || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone
    };
    
    res.status(201).json({message:"Contact created successfully",contact:newContact});
});

export default router;
