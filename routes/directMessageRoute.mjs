import express from 'express';
const router = express.Router();
import {
	sendDirectMessage,
	getDirectMessages,
} from '../controllers/directMessageController.mjs';

router.post('/send/:sender_id/:receiver_id', sendDirectMessage);
router.get('/get/:sender_id/:receiver_id', getDirectMessages);

export default router;
