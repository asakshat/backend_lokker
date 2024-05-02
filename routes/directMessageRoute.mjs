import express from 'express';
const router = express.Router();
import {
	sendDirectMessage,
	getDirectMessages,
	messagedUsers,
} from '../controllers/directMessageController.mjs';

router.post('/send/:sender_id/:receiver_id', sendDirectMessage);
router.get('/get/:sender_id/:receiver_id', getDirectMessages);
router.get('/get/:user_id', messagedUsers);

export default router;
