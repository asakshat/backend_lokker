import express from 'express';
const router = express.Router();

router.post('/deleteMessage/:lobby_id/message/:message_id', (deleteMessage) => {
	res.send('Message deleted');
});

export default router;
