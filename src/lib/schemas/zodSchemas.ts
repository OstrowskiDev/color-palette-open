import { z } from 'zod';

export const colorSlotSchema = z.object({
  name: z.enum(['primary', 'accent', 'highlight']),
  hue: z.number().min(0).max(360),
  saturation: z.number().min(0).max(100),
  lightnessRange: z.tuple([z.number().min(0).max(100), z.number().min(0).max(100)]),
  preset: z.enum(['soft', 'bold', 'muted', 'pastel']),
  shades: z.record(z.string(), z.string().regex(/^#[0-9a-fA-F]{6}$/)),
});

export const paletteSchema = z.object({
  id: z.string(),
  name: z.string(),
  mode: z.enum(['mono', 'duo', 'triadic']),
  createdBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  colors: z.array(colorSlotSchema),
  version: z.number().optional(),
  tags: z.array(z.string()).optional(),
});
