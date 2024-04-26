/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import { findEmail, findUsername } from '../configs/queries.mjs';
import { executeQuery } from '../configs/database.mjs';
import validator from 'validator';

//sign up
export const signUpFunction = async (username, email, password) => {
	//validation
	if (!email || !password || !username) {
		throw Error('All fields must be filled');
	}
	if (!validator.isEmail(email)) {
		throw Error('Email is not valid');
	}
	if (!validator.isStrongPassword(password)) {
		throw Error('Password not strong enough');
	}

	const existsEmail = await findEmail(email);
	const existsUsername = await findUsername(username);
	if (existsEmail || existsUsername) {
		throw Error('Email or Username already used');
	} else if (existsEmail === null) {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const user = await executeQuery(
			'INSERT INTO "User"(username,email,password_hash) VALUES ($1,$2,$3)',
			[username, email, hash]
		);

		return user;
	}
};

//login
export const loginFunction = async (email, password) => {
	if (!email || !password) {
		throw Error('All fields must be filled');
	}
	const user = await executeQuery('SELECT * FROM "User" WHERE email = $1', [
		email,
	]);
	if (user.length === 0) {
		throw Error('Invalid email');
	} else {
		const match = await bcrypt.compare(password, user[0].password_hash);

		if (!match) {
			throw Error('Invalid password');
		}
		return user;
	}
};
