import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
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
