/* eslint-disable no-unused-vars */
import { signUpFunction, loginFunction } from '../models/userModel.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUserIdByUsername } from '../configs/queries.mjs';
import { promisify } from 'util';

dotenv.config();
const sign = promisify(jwt.sign);

const createToken = async (id) => {
	return await sign({ id }, process.env.SECRET, { expiresIn: '1d' });
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await loginFunction(email, password);
		const token = await createToken(user.id);
		res.status(200).json({ email, token });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const signUpUser = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		await signUpFunction(username, email, password);
		const userId = await findUserIdByUsername(username);
		const token = await createToken(userId);
		res.status(200).json({ username, email, token });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export { loginUser, signUpUser };
