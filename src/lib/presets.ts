export const presets = {
  soft: { saturation: 80, lightnessRange: [95, 20] },
  bold: { saturation: 100, lightnessRange: [90, 10] },
  muted: { saturation: 60, lightnessRange: [92, 30] },
  pastel: { saturation: 70, lightnessRange: [98, 50] },
} as const;

export type PresetName = keyof typeof presets;
