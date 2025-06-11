import express from 'express';
import { 
  getAllContacts, 
  createContact,
  getContactById,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';
import validateToken from '../Middlewares/validateTokenHandler.js';

const router = express.Router();

router.use(validateToken);

// GET all contacts
router.get('/', getAllContacts);

router.post("/",createContact);

router.get("/:id",getContactById);

router.put("/:id",updateContact);

router.delete("/:id",deleteContact);


export default router;
// Remove the extra closing bracket and parenthesis as they are not n
