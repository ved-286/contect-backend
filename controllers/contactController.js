import expressAsyncHandler from "express-async-handler";
import Contact from "../models/contactModels.js";

// Get all contacts
export const getAllContacts = expressAsyncHandler(async(req, res) => {
    const contacts = await Contact.find();
  res.status(200).json(contacts);
});

export const createContact = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        return res.status(400).json({message:"All fields are required"})
    }

    const contact = await Contact.create({name,email,phone});
    
    res.status(200).json({message:"Contact created successfully",contact})
});

export const getContactById = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json({message:"Contact found successfully",contact})
});

export const updateContact = expressAsyncHandler(async(req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json({message:"Contact updated successfully",contact})
});

export const deleteContact = expressAsyncHandler(async(req, res) => {  
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Contact deleted successfully"})
});
