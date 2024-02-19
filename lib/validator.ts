import { z } from "zod";

export const EventFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  imageUrl: z.string(),
  startDateTime: z.date(),
  categoryId: z.string(),
  endDateTime: z.date(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
