import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(2, "Veuillez indiquer votre nom"),
  attendance: z.enum(["yes", "no"]),
  guests: z.string(),
  message: z.string().optional(),
});

export type RsvpValues = z.infer<typeof rsvpSchema>;
