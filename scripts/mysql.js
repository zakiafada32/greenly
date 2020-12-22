const path = require('path');
const envPath = path.resolve(process.cwd(), '.env.local');

console.log({ envPath });

require('dotenv').config({ path: envPath });

const mysql = require('serverless-mysql');

console.log(`
  ${process.env.MYSQL_HOST}
  ${process.env.MYSQL_DATABASE}
  ${process.env.MYSQL_USERNAME}
  ${process.env.MYSQL_PASSWORD}`);

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  },
});

async function query(q) {
  try {
    const results = await db.query(q);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await query(`
    CREATE TABLE member (
      id INT AUTO_INCREMENT PRIMARY KEY,
      member_id TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at 
        TIMESTAMP 
        NOT NULL 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
    )
    `);
    console.log('migration ran successfully');
  } catch (e) {
    console.error('could not run migration, double check your credentials.');
    process.exit(1);
  }
}

migrate().then(() => process.exit());
