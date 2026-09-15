import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().regex(/^[0-9+() -]{7,20}$/),
  gameId: z.string().trim().min(1).max(40),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  players: z.coerce.number().int().min(1).max(12),
  source: z.string().max(30).optional()
});

export const chatSchema = z.object({
  message: z.string().trim().min(1).max(800),
  history: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    text: z.string().max(1200)
  })).max(8).optional()
});
