import express from "express";
import cors from "cors";
import { env, validateEnv } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";

// Routes
import authRoutes from "./routes/auth";
import chatRoutes from "./routes/chat";
import eventsRoutes from "./routes/events";
import tasksRoutes from "./routes/tasks";
import profileRoutes from "./routes/profile";
import notesRoutes from "./routes/notes";
import tagsRoutes from "./routes/tags";
import notificationsRoutes from "./routes/notifications";
import preferencesRoutes from "./routes/preferences";
import analyticsRoutes from "./routes/analytics";

// Validate environment variables
validateEnv();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tags", tagsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/preferences", preferencesRoutes);
app.use("/api/analytics", analyticsRoutes);

// Error handler
app.use(errorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);
});

export default app;
