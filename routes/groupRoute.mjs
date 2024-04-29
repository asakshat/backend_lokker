import express from 'express';
import {
	joinGroup,
	leaveGroup,
	postMessage,
} from '../controllers/groupController.mjs';
const router = express.Router();

router.post('/join', joinGroup);
router.post('/leave', leaveGroup);
router.post('/postmessage', postMessage);

export default router;
