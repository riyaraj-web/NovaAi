import { Router } from "express";
import { AuthRequest, authMiddleware } from "../middleware/auth";
import { prisma } from "../config/database";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const { title, content, color } = req.body;

    const note = await prisma.note.create({
      data: {
        userId: req.userId!,
        title,
        content,
        color,
      },
    });

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

router.put("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { title, content, color } = req.body;

    const note = await prisma.note.update({
      where: { id },
      data: { title, content, color },
    });

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    await prisma.note.delete({ where: { id } });

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;
