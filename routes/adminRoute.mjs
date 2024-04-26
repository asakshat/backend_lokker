import express from 'express';
const router = express.Router();

router.post('/deleteMessage/:lobby_id/message/:message_id', (deleteMessage) => {
	res.send('Message deleted');
});

router.post('/updateMessage', (updateMessage) => {
	res.send('User deleted');
});
