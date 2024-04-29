import express from 'express';
const router = express.Router();
import { deleteMessage, createGroup } from '../controllers/adminController.mjs';

router.post('/deleteMessage/:group_id/:message_id', deleteMessage);
router.post('/createGroup', createGroup);

export default router;
