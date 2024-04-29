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

export const createGroupFunction = async (group_name, group_admin) => {
	const group = await executeQuery(
		'INSERT INTO "Group"(group_name,group_admin) VALUES ($1,$2) RETURNING group_id',
		[group_name, group_admin]
	);
	await executeQuery(
		'INSERT INTO "GroupMembers"(user_id, group_id) VALUES ($1,$2)',
		[group_admin, group[0].group_id]
	);
	return group;
};
