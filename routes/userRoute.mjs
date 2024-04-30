import express from 'express';
import {
	loginUser,
	signUpUser,
	searchUser,
} from '../controllers/userController.mjs';
const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signUpUser);
router.get('/search/:username', searchUser);

export default router;
