const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/todoDB";
mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

const TaskSchema = new mongoose.Schema({ task: String, completed: Boolean });
const Task = mongoose.model("Task", TaskSchema);

app.get("/", (req, res) => res.send("Backend is running!"));
app.get("/tasks", async (req, res) => res.json(await Task.find()));
app.post("/tasks", async (req, res) => res.json(await Task.create(req.body)));
app.delete("/tasks/:id", async (req, res) => res.json(await Task.findByIdAndDelete(req.params.id)));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
