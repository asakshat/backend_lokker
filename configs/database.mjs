import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: process.env.DB_PASSWORD,
	database: 'Locker',
	port: 5432,
});

export async function executeQuery(query, values) {
	return new Promise((resolve, reject) => {
		pool.query(query, values, (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results.rows);
			}
		});
	});
}
