import { executeQuery } from '../configs/database.mjs';
import { isAdmin } from '../configs/queries.mjs';

export const deleteMessage = async (req, res) => {
	const { lobby_id, message_id } = req.body;
	try {
		if (!isAdmin(req.username)) {
			throw Error('You are not an admin');
		}
		const message = await findMessageId(message_id);
		if (message.length === 0 || message === null) {
			throw Error('Invalid message');
		} else {
			const deleted = await executeQuery(
				'DELETE FROM "Message" WHERE lobby_id = $1 AND message_id = $2',
				[lobby_id, message_id]
			);
			res.status(200).json({ message: 'Message deleted' });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
