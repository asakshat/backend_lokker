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
	const { user_id, group_id } = req.params;
	const { message } = req.body;
	try {
		const response = await postMessageFunction(user_id, group_id, message);
		res.status(200).send(response);
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const listGroup = async (req, res) => {
	try {
		const { user_id } = req.params;
		const query = `
		SELECT "Group".*
		FROM "Group"
		JOIN "GroupMember" ON "Group".group_id = "GroupMember".group_id
		WHERE "GroupMember".user_id = $1
	  `;
		const group = await executeQuery(query, [user_id]);
		res.status(200).send(group);
	} catch (err) {
		res.status(400).send(err.message);
	}
};
const listMessages = async (req, res) => {
	try {
		const group_id = req.params.group_id;
		const query = `SELECT * FROM "Message" WHERE group_id = $1`;
		const messages = await executeQuery(query, [group_id]);
		res.status(200).send(messages);
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const listMember = async (req, res) => {
	try {
		const { group_id } = req.params;
		const query = `SELECT u.username 
                       FROM "GroupMember" gm 
                       INNER JOIN "User" u ON gm.user_id = u.user_id 
                       WHERE gm.group_id = $1`;
		const members = await executeQuery(query, [group_id]);
		res.status(200).send(members);
	} catch (err) {
		res.status(400).send(err.message);
	}
};

export {
	joinGroup,
	leaveGroup,
	postMessage,
	listGroup,
	listMessages,
	listMember,
};
