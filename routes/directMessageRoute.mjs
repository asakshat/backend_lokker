import express from 'express';
const router = express.Router();
import { sendDirectMessage } from '../controllers/directMessageController.mjs';

router.post('/send/:sender_id/:receiver_id', sendDirectMessage);

export default router;
