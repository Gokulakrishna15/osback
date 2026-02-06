import express, { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/authRouter";
import cookieParser from "cookie-parser";
import examRouter from "./routes/examRouter";
// importing models to ensure Mongoose registers them
import "./models/questionSchema";
import "./models/examSchema";
import "./models/userSchema";
import questionRoutes from "./routes/questionRoutes";
import incidentRouter from "./routes/incidentRoute";
import monitoringRoutes from "./routes/monitoringRoute";

const app = express();

//middleware
const allowedOrigins = [
  "https://onlineassessmentplatform.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173"
];

app.use(
  cors({
    // FIXED: Added strict types for origin and callback to satisfy TypeScript
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      // Allow requests with no origin (like mobile apps, Postman, or curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/api/exams", examRouter);
app.use("/api/questions", questionRoutes);
app.use("/api/incidents", incidentRouter);
app.use("/api/monitoring", monitoringRoutes);

export default app;