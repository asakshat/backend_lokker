import express from 'express';
import dotenv from 'dotenv';
import userAuth from './routes/userRoute.mjs';
import adminRoute from './routes/adminRoute.mjs';
import groupRoute from './routes/groupRoute.mjs';
import directMessageRoute from './routes/directMessageRoute.mjs';
import { authenticateToken } from './middlewares/authenticate.mjs';
import cors from 'cors';
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';

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

const httpServer = Server(app);
export const io = new SocketIOServer(httpServer, {
	cors: {
		origin: 'http://localhost:5173',
	},
});

let userSockets = {};

io.on('connection', (socket) => {
	console.log('a user connected');

	// When a user connects, store their socket ID
	socket.on('user connected', (userId) => {
		userSockets[userId] = socket.id;
	});

	socket.on('new message', (msg) => {
		const receiverSocketId = userSockets[msg.receiver_id];
		if (receiverSocketId) {
			io.to(receiverSocketId).emit('new message', msg);
		}
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');

		for (let userId in userSockets) {
			if (userSockets[userId] === socket.id) {
				delete userSockets[userId];
				break;
			}
		}
	});
});

httpServer.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
