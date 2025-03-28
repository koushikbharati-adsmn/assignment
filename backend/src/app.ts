import express from "express";
import "dotenv/config";
import cors, { CorsOptions } from "cors";

import authRoutes from "./routes/auth.Routes";
import workflowRoutes from "./routes/workflow.Routes";

const corsOptions: CorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/workflow", workflowRoutes);

app.get("/api", (req, res) => {
  res.send("Hello from Express + Vercel!");
});

export default app;
