import { Router } from "express";
import { AuthRequest, authMiddleware } from "../middleware/auth";
import { prisma } from "../config/database";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: req.userId },
    });
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
});

router.put("/", async (req: AuthRequest, res) => {
  try {
    const { theme, language, notifications, emailDigest, timezone } = req.body;

    const preferences = await prisma.userPreferences.upsert({
      where: { userId: req.userId },
      update: {
        theme,
        language,
        notifications,
        emailDigest,
        timezone,
      },
      create: {
        userId: req.userId!,
        theme,
        language,
        notifications,
        emailDigest,
        timezone,
      },
    });

    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: "Failed to update preferences" });
  }
});

export default router;
