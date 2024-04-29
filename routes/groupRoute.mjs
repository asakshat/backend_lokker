import express from 'express';
import {
	joinGroup,
	leaveGroup,
	postMessage,
} from '../controllers/userController.mjs';
const router = express.Router();

router.post('/join', joinGroup);
router.post('/leave', leaveGroup);
router.post('/postmessage', postMessage);
