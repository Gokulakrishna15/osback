import { Router, Request, Response } from "express"; // FIXED: Imported Request and Response
import Student from "../models/studentSchema";

const monitoringRoutes = Router();

// GET: Fetch all students
monitoringRoutes.get("/students", async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// POST: Add a student (for testing/demo)
monitoringRoutes.post("/students", async (req: Request, res: Response) => {
  try {
    const { name, status, activity } = req.body;
    const student = new Student({ name, status, activity });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

// PUT: Flag an incident for a student
monitoringRoutes.put("/students/:id/flag", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { incident } = req.body;

    const student = await Student.findById(id);
    if (!student) {
        res.status(404).json({ error: "Student not found" });
        return; 
    }

    student.flaggedIncidents.push(incident);
    await student.save();

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Failed to flag incident" });
  }
});

export default monitoringRoutes;