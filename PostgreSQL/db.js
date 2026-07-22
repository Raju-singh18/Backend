import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Function to connect to PostgreSQL
export const connectDB = async () => {
    try {
        await pool.query("SELECT 1");
        console.log("PostgreSQL Connected");
    } catch (error) {
        console.error("Database Connection Failed");
        console.error(error.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};

export default pool;
