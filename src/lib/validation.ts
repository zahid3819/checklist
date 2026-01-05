import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
});

export const createChecklistSchema = z.object({
  title: z.string().min(1).max(200),
});

export const updateChecklistSchema = z.object({
  title: z.string().min(1).max(200).optional(),
});

export const createItemSchema = z.object({
  checklistId: z.string().min(1),
  content: z.string().min(1).max(500),
});

export const updateItemSchema = z.object({
  content: z.string().min(1).max(500).optional(),
  completed: z.boolean().optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type CreateChecklistInput = z.infer<typeof createChecklistSchema>;
export type UpdateChecklistInput = z.infer<typeof updateChecklistSchema>;
export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
