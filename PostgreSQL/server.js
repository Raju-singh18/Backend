import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import pool from "./db.js"

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/create-table", async (req, res) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS students (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100) UNIQUE
            );
        `);

        res.json({
            message: "Table created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.post("/students", async (req, res) => {

    try {

        const { name, email } = req.body;

        const result = await pool.query(
            "INSERT INTO students(name,email) VALUES($1,$2) RETURNING *",
            [name, email]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

});

app.get("/students", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM students"
        );

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

});

app.get("/students/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM students WHERE id=$1",
            [id]
        );

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }

});

app.put("/students/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { name, email } = req.body;

        const result = await pool.query(
            `UPDATE students
             SET name=$1,email=$2
             WHERE id=$3
             RETURNING *`,
            [name, email, id]
        );

        res.json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

});

app.delete("/students/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM students WHERE id=$1",
            [id]
        );

        res.json({
            message:"Student Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

});

const startServer = async () => {
    await connectDB(); // Connect to database

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
