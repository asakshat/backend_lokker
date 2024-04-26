import express from 'express';
import dotenv from 'dotenv';
import userAuth from './routes/userAuth.mjs';
import { authenticateToken } from './middlewares/authenticate.mjs';
import { findUsername } from './configs/queries.mjs';

dotenv.config();

const app = express();

app.use(express.json());

const user = await findUsername('RetroSax');
console.log(user);

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
	res.send('Hello Express');
});
app.use('/api/user', userAuth);
app.use(authenticateToken);

app.listen(process.env.PORT, () => console.log('http://localhost:3000'));
