import express from 'express';
const router = express.Router();
import {
	sendDirectMessage,
	getDirectMessages,
	messagedUsers,
	deleteDirectMessage,
} from '../controllers/directMessageController.mjs';

router.post('/send/:sender_id/:receiver_id', sendDirectMessage);
router.get('/get/:sender_id/:receiver_id', getDirectMessages);
router.get('/get/:sender_id', messagedUsers);
router.delete('/delete/:user_id/:message_id', deleteDirectMessage);

export default router;
