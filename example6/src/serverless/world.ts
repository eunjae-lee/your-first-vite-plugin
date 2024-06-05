import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1),
});

export function handler({ name }: z.infer<typeof schema>) {
  return {
    message: `world, ${name}`,
  };
}

export const method = "POST";
