import express from 'express';
import dotenv from 'dotenv';
import userAuth from './routes/userRoute.mjs';
import adminRoute from './routes/adminRoute.mjs';
import groupRoute from './routes/groupRoute.mjs';
import directMessageRoute from './routes/directMessageRoute.mjs';
import { authenticateToken } from './middlewares/authenticate.mjs';
import cors from 'cors';

dotenv.config();

const app = express();

const allowedOrigins = [
	'https://lokkerroom-d7516.web.app/',
	'http://127.0.0.1:5173',
];
const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
	methods: ['GET', 'POST', 'DELETE', 'PATCH'],
	allowedHeaders: ['Content-Type', 'Authorization', 'username'],
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

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
