import { Router } from "express";
import { AuthRequest, authMiddleware } from "../middleware/auth";
import { prisma } from "../config/database";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const events = await prisma.calendarEvent.findMany({
      where: { userId: req.userId },
      orderBy: { startTime: "asc" },
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.post("/", async (req: AuthRequest, res) => {
  try {
    const { title, description, startTime, endTime, location, color } = req.body;

    const event = await prisma.calendarEvent.create({
      data: {
        userId: req.userId!,
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location,
        color,
      },
    });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

router.put("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { title, description, startTime, endTime, location, color } = req.body;

    const event = await prisma.calendarEvent.update({
      where: { id },
      data: {
        title,
        description,
        startTime: startTime ? new Date(startTime) : undefined,
        endTime: endTime ? new Date(endTime) : undefined,
        location,
        color,
      },
    });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    await prisma.calendarEvent.delete({ where: { id } });

    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
