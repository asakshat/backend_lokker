import { executeQuery } from '../configs/database.mjs';
import {
	joinGroupFunction,
	leaveGroupFunction,
	postMessageFunction,
} from '../models/groupModel.mjs';

const joinGroup = async (req, res) => {
	const { user_id } = req.body;
	const { group_id } = req.params;
	try {
		await joinGroupFunction(user_id, group_id);
		res.status(200).send('Group joined');
	} catch (err) {
		res.status(400).send(err.message);
	}
};
const leaveGroup = async (req, res) => {
	const { user_id } = req.body;
	const { group_id } = req.params;
	try {
		await leaveGroupFunction(user_id, group_id);
		res.status(200).send('Group left');
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const postMessage = async (req, res) => {
	const { user_id, group_id } = req.body;
	try {
		await postMessageFunction(user_id, group_id);
		res.status(200).send('Message posted');
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const listGroup = async (req, res) => {
	try {
		const userId = req.params.user_id;
		const query = `
		SELECT "Group".*
		FROM "Group"
		JOIN "GroupMember" ON "Group".group_id = "GroupMember".group_id
		WHERE "GroupMember".user_id = $1
	  `;
		const group = await executeQuery(query, [userId]);
		res.status(200).send(group);
	} catch (err) {
		res.status(400).send(err.message);
	}
};

export { joinGroup, leaveGroup, postMessage, listGroup };
