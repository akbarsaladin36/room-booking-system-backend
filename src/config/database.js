const knex = require('knex')
const dotenv = require('dotenv')
dotenv.config()

const db = knex({
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
})

const ConnectDB = async () => {
    try {
        await db.raw('SELECT 1')
        console.log('✅ Database connected successfully');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    }
};

ConnectDB()

module.exports = db

