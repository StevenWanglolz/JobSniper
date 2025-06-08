import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/.env` });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/jobsniper";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Job Application Schema
const jobApplicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  notes: String,
  appliedDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

// Routes
app.get("/api/applications", async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ appliedDate: -1 });
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/applications", async (req, res) => {
  try {
    const application = new JobApplication(req.body);
    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/applications/:id", async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: Date.now() },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/applications/:id", async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
