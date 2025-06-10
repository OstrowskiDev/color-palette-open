export const hueOffsetOptions = [
  { value: { name: 'monochrome', angle: [0] }, label: 'Monochrome' },
  { value: { name: 'complementary', angle: [0, 180] }, label: 'Complementary' },
  {
    value: { name: 'split-complementary', angle: [0, 150, -150] },
    label: 'Split Complementary',
  },
  { value: { name: 'triadic', angle: [0, 120, -120] }, label: 'Triadic' },
  { value: { name: 'analogous', angle: [0, 30, -30] }, label: 'Analogous' },
  { value: { name: 'custom', angle: [0, 0, 0] }, label: 'Custom' },
]

export const presetSLOptions = [
  {
    value: {
      name: 'soft',
      sat: 80,
      lightRange: [97, 95, 91, 86, 78, 70, 62, 54, 46, 38, 30],
    },
    label: 'soft',
  },
  {
    value: {
      name: 'contrasts',
      sat: 100,
      lightRange: [97, 94, 88, 78, 65, 55, 45, 35, 25, 18, 10],
    },
    label: 'contrasts',
  },
  {
    value: {
      name: 'dark',
      sat: 80,
      lightRange: [24, 21, 18, 15, 12, 10, 8, 6, 4, 2, 1], // ciemna baza
    },
    label: 'dark',
  },
  {
    value: {
      name: 'natural',
      sat: 60,
      lightRange: [96, 92, 87, 80, 72, 64, 56, 48, 40, 32, 24],
    },
    label: 'natural',
  },
  {
    value: {
      name: 'earthy',
      sat: 40,
      lightRange: [40, 38, 36, 34, 30, 26, 22, 18, 14, 10, 6],
    },
    label: 'earthy',
  },
  {
    value: {
      name: 'pastel',
      sat: 70,
      lightRange: [98, 96, 93, 89, 82, 74, 66, 58, 50, 42, 35],
    },
    label: 'pastel',
  },
]
