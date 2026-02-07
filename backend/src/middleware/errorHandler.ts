import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: error.errors,
    });
  }

  if (error.message === "Unauthorized") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (error.message === "Not found") {
    return res.status(404).json({ error: "Not found" });
  }

  return res.status(500).json({
    error: "Internal server error",
    message: error.message,
  });
}
