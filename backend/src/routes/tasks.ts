import { Router } from "express";
import { AuthRequest, authMiddleware } from "../middleware/auth";
import { prisma } from "../config/database";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;

    const task = await prisma.task.create({
      data: {
        userId: req.userId!,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        category,
      },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.put("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, dueDate, priority, category } = req.body;

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        completed,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority,
        category,
      },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({ where: { id } });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
