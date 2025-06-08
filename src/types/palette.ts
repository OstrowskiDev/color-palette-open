export type ShadeMap = Record<'50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900', string>;

export type ColorSlot = {
  name: 'primary' | 'accent' | 'highlight';
  hue: number;
  saturation: number;
  lightnessRange: [number, number];
  preset: 'soft' | 'bold' | 'muted' | 'pastel';
  shades: ShadeMap;
};

export type ColorPalette = {
  id: string;
  name: string;
  mode: 'mono' | 'duo' | 'triadic';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  colors: ColorSlot[];
  version?: number;
  tags?: string[];
};
