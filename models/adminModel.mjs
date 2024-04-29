import { executeQuery } from '../configs/database.mjs';
import { findMessageId } from '../configs/queries.mjs';

export const deleteMessageFunction = async (group_id, message_id) => {
	const message = await findMessageId(group_id, message_id);
	if (message.length === 0 || message === null) {
		throw Error('Invalid message');
	} else {
		const deleted = await executeQuery(
			'DELETE FROM "Message" WHERE group_id = $1 AND message_id = $2',
			[group_id, message_id]
		);
		return deleted;
	}
};
