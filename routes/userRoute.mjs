import express from 'express';
import {
	loginUser,
	signUpUser,
	leaveGroup,
} from '../controllers/userController.mjs';
const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signUpUser);
router.post('/joingroup/:group_id', joinGroup);
router.post('/leavegroup/:group_id', leaveGroup);
export default router;
