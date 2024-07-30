import * as z from "zod";

export const formSchema = z.object({
  prompt: z
    .string()
    .min(1, "Please enter a message")
    .max(1000, "Message too long"),
});
