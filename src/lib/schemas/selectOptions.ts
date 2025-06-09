export const hueOffsetOptions = [
  { value: { name: 'monochrome', angle: [0] }, label: 'monochrome' },
  {
    value: { name: 'complementary', angle: [0, 180] },
    label: 'complementary',
  },
  { value: { name: 'triadical', angle: [0, 120, -120] }, label: 'triadical' },
  { value: { name: 'analogus', angle: [0, 30, -30] }, label: 'analogus' },
  { value: { name: 'neutral', angle: [0, 15, -15] }, label: 'neutral' },
  { value: { name: 'custom', angle: [0, 0, 0] }, label: 'custom' },
]

export const presetSLOptions = [
  {
    value: {
      name: 'soft',
      sat: 80,
      lightRange: [95, 20],
    },
    label: 'soft',
  },
  {
    value: {
      name: 'bold',
      sat: 100,
      lightRange: [90, 10],
    },
    label: 'bold',
  },
  {
    value: {
      name: 'muted',
      sat: 60,
      lightRange: [92, 30],
    },
    label: 'muted',
  },
  {
    value: {
      name: 'pastel',
      sat: 70,
      lightRange: [98, 50],
    },
    label: 'pastel',
  },
]
