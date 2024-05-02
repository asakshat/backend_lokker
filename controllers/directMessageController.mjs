import {
	sendDirectMessageFunction,
	getDirectMessagesFunction,
} from '../models/directMessageModel.mjs';
import { executeQuery } from '../configs/database.mjs';

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
			`SELECT DISTINCT CASE WHEN dm.sender_id = $1 THEN dm.receiver_id ELSE dm.sender_id END AS user_id, u.username 
            FROM "DirectMessage" dm 
            JOIN "User" u ON u.user_id = CASE WHEN dm.sender_id = $1 THEN dm.receiver_id ELSE dm.sender_id END 
            WHERE dm.sender_id = $1 OR dm.receiver_id = $1`,
			[sender_id]
		);
		res.status(200).json(users);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
