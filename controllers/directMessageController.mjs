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

export const messagedUsers = async (req, res) => {
	const { sender_id } = req.params;
	try {
		const users = await executeQuery(
			'SELECT DISTINCT CASE WHEN sender_id = $1 THEN receiver_id ELSE sender_id END AS user_id FROM "DirectMessage" WHERE sender_id = $1 OR receiver_id = $1',
			[sender_id]
		);
		const response = users.map((user) => user.user_id);
		res.status(200).json(response);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
