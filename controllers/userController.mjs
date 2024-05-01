/* eslint-disable no-unused-vars */
import { signUpFunction, loginFunction } from '../models/userModel.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUserIdByUsername } from '../configs/queries.mjs';
import { promisify } from 'util';
import { access } from 'fs';
import { executeQuery } from '../configs/database.mjs';

dotenv.config();
const sign = promisify(jwt.sign);

const createToken = async (id, expiresIn) => {
	return await sign({ id }, process.env.SECRET, { expiresIn });
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await loginFunction(email, password);
		const accessToken = await createToken(user.id, '1d');
		res.status(200).json({
			username: user.username,
			email: user.email,
			accessToken: accessToken,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const signUpUser = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		await signUpFunction(username, email, password);
		const userId = await findUserIdByUsername(username);
		const accessToken = await createToken(userId, '1d');

		res
			.status(200)
			.json({ username: username, email: email, accessToken: accessToken });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
const searchUser = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await executeQuery(
			'SELECT username FROM "User" WHERE username Like $1',
			[username]
		);
		if (user.length === 0) {
			res.status(404).json({ error: 'User not found' });
		} else {
			const usernames = user.map((users) => users.username);
			res.status(200).json({ users: usernames });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export { loginUser, signUpUser, searchUser };
