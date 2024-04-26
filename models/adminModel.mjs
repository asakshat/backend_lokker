import { executeQuery } from '../configs/database.mjs';
import { findMessageId } from '../configs/queries.mjs';

export const deleteMessageFunction = async (message_id) => {
	const message = await findMessageId(message_id);
	if (message.length === 0 || message === null) {
		throw Error('Invalid message');
	} else {
		const deleted = await executeQuery(
			'DELETE FROM Message WHERE lobby_id = ? AND message_id = ?',
			[lobby_id, message_id]
		);
		return deleted;
	}
};

export const updateMessageFunction = async (message_id, message) => {
	const message = await findMessageId(message_id);
	if (message.length === 0 || message === null) {
		throw Error('Invalid message');
	} else {
		const updated = await executeQuery(
			'UPDATE Message SET message = ? WHERE lobby_id = ? AND message_id = ?',
			[message, lobby_id, message_id]
		);
		return updated;
	}
};
