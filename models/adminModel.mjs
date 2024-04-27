import { executeQuery } from '../configs/database.mjs';
import { findMessageId } from '../configs/queries.mjs';

export const deleteMessageFunction = async (message_id) => {
	const message = await findMessageId(message_id);
	if (message.length === 0 || message === null) {
		throw Error('Invalid message');
	} else {
		const deleted = await executeQuery(
			'DELETE FROM "Message" WHERE lobby_id = $1 AND message_id = $2',
			[lobby_id, message_id]
		);
		return deleted;
	}
};
