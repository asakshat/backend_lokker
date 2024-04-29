import { sendDirectMessageFunction } from '../models/directMessageModel.mjs';

export const sendDirectMessage = async (req, res) => {
	const { sender_id, receiver_id, message } = req.params;
	try {
		await sendDirectMessageFunction(sender_id, receiver_id, message);
		res.status(200).send('Message sent');
	} catch (err) {
		res.status(400).send(err.message);
	}
};
