import { executeQuery } from '../configs/database.mjs';
export const joinGroupFunction = async (user_id, group_id) => {
	const group = await executeQuery(
		'SELECT group_id FROM "Group" WHERE group_id = $1',
		[group_id]
	);
	if (group.length === 0) {
		throw Error('Invalid group');
	}
	const member = await executeQuery(
		'SELECT user_id FROM "GroupMembers" WHERE user_id = $1 AND group_id = $2',
		[user_id, group_id]
	);
	if (member.length !== 0) {
		throw Error('Already in group');
	}
	const join = await executeQuery(
		'INSERT INTO "GroupMembers"(user_id,group_id) VALUES ($1,$2)',
		[user_id, group_id]
	);
	return join;
};

export const leaveGroupFunction = async (user_id, group_id) => {
	const group = await executeQuery(
		'SELECT group_id FROM "Group" WHERE group_id = $1',
		[group_id]
	);
	if (group.length === 0) {
		throw Error('Invalid group');
	}
	const member = await executeQuery(
		'SELECT user_id FROM "GroupMembers" WHERE user_id = $1 AND group_id = $2',
		[user_id, group_id]
	);
	if (member.length === 0) {
		throw Error('Not in group');
	}
	const leave = await executeQuery(
		'DELETE FROM "GroupMembers" WHERE user_id = $1 AND group_id = $2',
		[user_id, group_id]
	);
	return leave;
};

export const postMessageFunction = async (user_id, group_id, message) => {
	const message = await executeQuery(
		'INSERT INTO "Message"(user_id,group_id,message) VALUES ($1,$2,$3)',
		[user_id, group_id, message]
	);
	return message;
};
