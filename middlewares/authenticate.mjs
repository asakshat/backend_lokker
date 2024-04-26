import { promisify } from 'util';
import jwt from 'jsonwebtoken';
const verify = promisify(jwt.verify);

export async function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		return res.status(401).send(`Unauthorized`);
	}

	const user = await verify(token, process.env.TOKEN);
	req.user = user;
	next();
}
