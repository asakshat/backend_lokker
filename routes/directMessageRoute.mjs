import express from 'express';
const router = express.Router();
import { sendDirectMessage } from '../controllers/directMessageContoller.mjs';

router.post('/send/:sender_id/:receiver_id', sendDirectMessage);

export default router;
