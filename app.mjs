import express from 'express';
import dotenv from 'dotenv';
import userAuth from './routes/userRoute.mjs';
import adminRoute from './routes/adminRoute.mjs';
import groupRoute from './routes/groupRoute.mjs';
import directMessageRoute from './routes/directMessageRoute.mjs';
import { authenticateToken } from './middlewares/authenticate.mjs';
import cors from 'cors';
import { executeQuery } from './configs/database.mjs';
const users = await executeQuery(
	'SELECT DISTINCT CASE WHEN sender_id = $1 THEN receiver_id ELSE sender_id END AS user_id FROM "DirectMessage" WHERE sender_id = $1 OR receiver_id = $1',
	['49e49736-c3eb-4c45-a446-ecff0d5ce0d5']
);
console.log(users);

dotenv.config();

const app = express();
const corsOption = {
	origin: 'http://localhost:5173',
};
app.use(cors(corsOption));
app.use(express.json());

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
	res.send('Hello Express');
});
app.get('/verifytoken', authenticateToken, (req, res) => {
	res.status(200).send('Token is valid');
});
app.use('/api/user', userAuth);
app.use(authenticateToken);
app.get('/hello', (req, res) => {
	res.send('Hello Express');
});
app.use('/api/admin', adminRoute);
app.use('/api/group', groupRoute);
app.use('/api/directmessage', directMessageRoute);

app.listen(process.env.PORT, () => console.log('http://localhost:3000'));
