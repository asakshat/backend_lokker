export const sendDirectMessageFunction = async (
	sender_id,
	receiver_id,
	message
) => {
	if (!sender_id || !receiver_id || !message) {
		throw Error('Please provide sender_id, receiver_id and message');
	}
	if (sender_id === receiver_id) {
		throw Error('You cannot send a message to yourself');
	}
	if (message.length > 250) {
		throw Error('Message is too long');
	}
	if (message.length === 0) {
		throw Error('Message cannot be empty');
	}
	const message = await executeQuery(
		'INSERT INTO "DirectMessage" (sender_id, receiver_id, message) VALUES ($1, $2, $3)',
		[sender_id, receiver_id, message]
	);
	return message;
};
