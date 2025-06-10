import express from 'express';
import { regesterUser,loginUser,getCurrentUser } from '../controllers/userController.js';
import validateToken from '../Middlewares/validateTokenHandler.js';

const router = express.Router();

router.post('/register',regesterUser);
router.post('/login',loginUser);
router.get('/current',validateToken,getCurrentUser);

export default router;