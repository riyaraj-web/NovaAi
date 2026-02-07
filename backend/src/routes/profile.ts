import { Router } from "express";
import { AuthRequest, authMiddleware } from "../middleware/auth";
import { prisma } from "../config/database";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.put("/", async (req: AuthRequest, res) => {
  try {
    const { name, bio, avatar } = req.body;

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { name, bio, avatar },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
