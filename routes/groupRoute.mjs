import express from 'express';
import {
	joinGroup,
	leaveGroup,
	postMessage,
	listGroup,
	listMessages,
	listMember,
} from '../controllers/groupController.mjs';
const router = express.Router();

router.post('/join', joinGroup);
router.post('/leave', leaveGroup);
router.post('/postmessage/:user_id/:group_id', postMessage);
router.get('/list/:user_id', listGroup);
router.get('/messages/:group_id', listMessages);
router.get('/members/:group_id', listMember);
export default router;
