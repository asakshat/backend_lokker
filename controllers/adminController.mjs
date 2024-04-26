import { executeQuery } from '../configs/database.mjs';
import { isAdmin } from '../configs/queries.mjs';

export const deleteMessage = async (req, res) => {
	const { lobby_id, message_id } = req.body;
};
