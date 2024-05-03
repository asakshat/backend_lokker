import { executeQuery } from '../configs/database.mjs';
import {
	deleteMessageFunction,
	createGroupFunction,
} from '../models/adminModel.mjs';

export const deleteMessage = async (req, res) => {
	const { lobby_id, message_id } = req.params;
	try {
		const deleteMessage = await deleteMessageFunction(lobby_id, message_id);
		res.status(200).send(deleteMessage);
	} catch (err) {
		res.status(400).send(err.message);
	}
};

export const createGroup = async (req, res) => {
	const { group_name } = req.body;
	const { group_admin } = req.params;
	const groupName = await executeQuery(
		'SELECT group_name FROM "Group" where group_name = $1',
		[group_name]
	);
	if (groupName.length > 0) {
		res.status(400).send('Group name already exists');
	}
	try {
		const group = await createGroupFunction(group_name, group_admin);
		res.status(200).send(group);
	} catch (err) {
		res.status(400).send(err.message);
	}
};
