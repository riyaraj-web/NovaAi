import { Router } from "express";
import { AuthRequest, authMiddleware } from "../middleware/auth";
import { prisma } from "../config/database";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const analytics = await prisma.analytics.findUnique({
      where: { userId: req.userId },
    });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

router.post("/track", async (req: AuthRequest, res) => {
  try {
    const { event, data } = req.body;

    let analytics = await prisma.analytics.findUnique({
      where: { userId: req.userId },
    });

    if (!analytics) {
      analytics = await prisma.analytics.create({
        data: { userId: req.userId! },
      });
    }

    // Track various events
    const updateData: any = { lastActiveAt: new Date() };

    if (event === "chat") updateData.totalChats = { increment: 1 };
    if (event === "task") updateData.totalTasks = { increment: 1 };
    if (event === "task_completed")
      updateData.completedTasks = { increment: 1 };
    if (event === "note") updateData.totalNotes = { increment: 1 };
    if (event === "event") updateData.totalEvents = { increment: 1 };

    const updatedAnalytics = await prisma.analytics.update({
      where: { userId: req.userId },
      data: updateData,
    });

    res.json(updatedAnalytics);
  } catch (error) {
    res.status(500).json({ error: "Failed to track analytics" });
  }
});

export default router;
