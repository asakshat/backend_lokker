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
router.get('/list/:user_id', listGroup);

export default router;
