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

const postMessageFunction = async (user_id, group_id) => {
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
	const message = await executeQuery(
		'INSERT INTO "Message"(user_id,group_id) VALUES ($1,$2)',
		[user_id, group_id]
	);
	return message;
};
