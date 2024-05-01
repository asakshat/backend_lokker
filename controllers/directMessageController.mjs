import {
	sendDirectMessageFunction,
	getDirectMessagesFunction,
} from '../models/directMessageModel.mjs';

export const sendDirectMessage = async (req, res) => {
	const { sender_id, receiver_id } = req.params;
	const { message } = req.body;
	try {
		await sendDirectMessageFunction(sender_id, receiver_id, message);
		res.status(200).send('Message sent');
	} catch (err) {
		res.status(400).send(err.message);
	}
};

export const getDirectMessages = async (req, res) => {
	const { sender_id, receiver_id } = req.params;
	try {
		const messages = await getDirectMessagesFunction(sender_id, receiver_id);
		res.status(200).json(messages);
	} catch (err) {
		res.status(400).send(err.message);
	}
};
