import expressAsyncHandler from "express-async-handler";
import Contact from "../models/contactModels.js";

// Get all contacts
export const getAllContacts = expressAsyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

export const createContact = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        return res.status(400).json({message:"All fields are required"})
    }

    const contact = await Contact.create({name,email,phone,user_id:req.user.id});
    
    res.status(200).json({message:"Contact created successfully",contact})
});

export const getContactById = expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id,{user_id:req.user.id});
    res.status(200).json({message:"Contact found successfully",contact})
});

export const updateContact = expressAsyncHandler(async(req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true,user_id:req.user.id});

    if(!contact){
        res.status(404).json({message:"Contact not found"});
        return;
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403).json({message:"You are not authorized to update this contact"});
        return;
    }
    res.status(200).json({message:"Contact updated successfully",contact})
});

export const deleteContact = expressAsyncHandler(async(req, res) => {  
    await Contact.findByIdAndDelete(req.params.id,{user_id:req.user.id});
    res.status(200).json({message:"Contact deleted successfully"})
});
