import { Router } from "express";
import { AuthRequest, authMiddleware } from "../middleware/auth";
import { prisma } from "../config/database";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const messages = await prisma.chatMessage.findMany({
      where: { userId: req.userId },
      orderBy: { timestamp: "asc" },
      take: 50,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const { content, role = "user" } = req.body;

    const message = await prisma.chatMessage.create({
      data: {
        userId: req.userId!,
        content,
        role,
      },
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to create message" });
  }
});

export default router;
