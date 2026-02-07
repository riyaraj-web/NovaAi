import { Router } from "express";
import { AuthRequest, authMiddleware } from "../middleware/auth";
import { prisma } from "../config/database";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const { title, message } = req.body;

    const notification = await prisma.notification.create({
      data: {
        userId: req.userId!,
        title,
        message,
      },
    });

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: "Failed to create notification" });
  }
});

router.put("/:id/read", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
});

router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    await prisma.notification.delete({ where: { id } });

    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

export default router;
