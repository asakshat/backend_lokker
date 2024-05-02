import { executeQuery } from '../configs/database.mjs';
export const sendDirectMessageFunction = async (
	sender_id,
	receiver_id,
	message
) => {
	if (!sender_id || !receiver_id || !message) {
		throw Error('Please provide sender_id, receiver_id and message');
	}

	if (message.length > 250) {
		throw Error('Message is too long');
	}
	if (message.length === 0) {
		throw Error('Message cannot be empty');
	}
	const result = await executeQuery(
		'INSERT INTO "DirectMessage" (sender_id, receiver_id, message) VALUES ($1, $2, $3)',
		[sender_id, receiver_id, message]
	);
};

export const getDirectMessagesFunction = async (sender_id, receiver_id) => {
	if (!sender_id || !receiver_id) {
		throw Error('Please provide sender_id and receiver_id');
	}
	const messages = await executeQuery(
		'SELECT * FROM "DirectMessage" WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ',
		[sender_id, receiver_id]
	);
	return messages;
};
