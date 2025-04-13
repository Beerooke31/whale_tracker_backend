import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { query } from "./db.mjs";
const app = express();

//  Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//GET all users
app.get("/users", async (req, res) => {
  try {
    const { rows } = await query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

// GET a single user by ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await query("SELECT * FROM users WHERE id = $1", [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

// POST a new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const { rows } = await query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error creating user", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});
