
import expressAsyncHandler from "express-async-handler";
// Get all contacts
export const getAllContacts = expressAsyncHandler(async(req, res) => {
  res.status(200).json({ message: 'Get all contacts' });
});

export const createContact = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        return res.status(400).json({message:"All fields are required"})
    }
    
    res.status(200).json({message:"Contact created successfully"})
});

export const getContactById = expressAsyncHandler(async (req, res) => {
    res.status(200).json({message:"Contact found successfully"})
});

export const updateContact = expressAsyncHandler(async(req, res) => {
    res.status(200).json({message:"Contact updated successfully"})
});

export const deleteContact = expressAsyncHandler(async(req, res) => {  
    res.status(200).json({message:"Contact deleted successfully"})
});
