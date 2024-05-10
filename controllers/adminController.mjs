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
	} else {
		try {
			const group = await createGroupFunction(group_name, group_admin);
			res.status(200).send(group);
		} catch (err) {
			res.status(400).send(err.message);
		}
	}
};

export const addUserToGroup = async (req, res) => {
    const { group_id, user_id } = req.params;
    try {
        const userExists = await executeQuery(
            'SELECT * FROM "User" WHERE user_id = $1',
            [user_id]
        );
        if (userExists.length === 0) {
            return res.status(404).send('User not found');
        }

        const isMember = await executeQuery(
            'SELECT * FROM "GroupMember" WHERE user_id = $1 AND group_id = $2',
            [user_id, group_id]
        );
        if (isMember.length > 0) {
            return res.status(400).send('User is already a member of the group');
        }

        await executeQuery(
            'INSERT INTO "GroupMember" (user_id, group_id) VALUES ($1, $2)',
            [user_id, group_id]
        );
        res.status(200).send('User added to the group successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
