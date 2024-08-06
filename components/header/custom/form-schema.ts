import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
});

export type FormData = z.infer<typeof formSchema>;
