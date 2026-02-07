import { Router } from "express";
import { AuthRequest, authMiddleware } from "../middleware/auth";
import { prisma } from "../config/database";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const tags = await prisma.tag.findMany({
      where: { userId: req.userId },
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const { name, color } = req.body;

    const tag = await prisma.tag.create({
      data: {
        userId: req.userId!,
        name,
        color,
      },
    });

    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: "Failed to create tag" });
  }
});

router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    await prisma.tag.delete({ where: { id } });

    res.json({ message: "Tag deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tag" });
  }
});

export default router;
