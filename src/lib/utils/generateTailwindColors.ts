import { ColorSetNames, PresetSL } from './hue'
import { HueOffset } from './position'

export default function generateTailwindColors(
  baseHue: number,
  hueOffset: HueOffset,
  presetSL: PresetSL,
  colorSetNames: ColorSetNames,
) {
  const twBreakPts = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const tailwindColors: Record<string, Record<number, string>> = {}
  for (let i = 0; i < 3; i++) {
    tailwindColors[colorSetNames[i]] = {}
    for (let j = 0; j < twBreakPts.length; j++) {
      const hue = baseHue + hueOffset.angle[i]
      const sat = presetSL.sat
      const light = presetSL.lightRange[j]
      tailwindColors[colorSetNames[i]][twBreakPts[j]] =
        `hsl(${hue}, ${sat}%, ${light}%)`
    }
  }
  return tailwindColors
}

// ColorSetNames pochodzi od usera, ale także wyświetla się tylko u usera, i stworzony obiekt jest wywyłany do jego aplikacji nigdzie indzej, więc tutaj nie potrzeba bardzo zaawansowanej walidacji, po prostu trim plus zmiana na kebab-case powinno wystarczyć
// jeden ważny warunek, jeśli user używa - lub spacji (zamiana na kebab-case) wtedy trzeba dodać '' do nazwy zmiennej inaczej TW tego nie obsłuży dobrze

// output:
// 'primary': {
//   50: 'hsl(0, 0%, 98%)',
//   100: 'hsl(0, 0%, 95%)',
//   200: 'hsl(0, 0%, 85%)',
//   300: 'hsl(0, 0%, 75%)',
//   400: 'hsl(0, 0%, 60%)',
//   500: 'hsl(0, 0%, 50%)',
//   600: 'hsl(0, 0%, 40%)',
//   700: 'hsl(0, 0%, 30%)',
//   800: 'hsl(0, 0%, 20%)',
//   900: 'hsl(0, 0%, 10%)',
//   950: 'hsl(0, 0%, 5%)',
// },
// 'accent': {
//   50: 'hsl(0, 0%, 98%)',
//   100: 'hsl(0, 0%, 95%)',
//   200: 'hsl(0, 0%, 85%)',
//   300: 'hsl(0, 0%, 75%)',
//   400: 'hsl(0, 0%, 60%)',
//   500: 'hsl(0, 0%, 50%)',
//   600: 'hsl(0, 0%, 40%)',
//   700: 'hsl(0, 0%, 30%)',
//   800: 'hsl(0, 0%, 20%)',
//   900: 'hsl(0, 0%, 10%)',
//   950: 'hsl(0, 0%, 5%)',
// },
// 'highlight': {
//   50: 'hsl(0, 0%, 98%)',
//   100: 'hsl(0, 0%, 95%)',
//   200: 'hsl(0, 0%, 85%)',
//   300: 'hsl(0, 0%, 75%)',
//   400: 'hsl(0, 0%, 60%)',
//   500: 'hsl(0, 0%, 50%)',
//   600: 'hsl(0, 0%, 40%)',
//   700: 'hsl(0, 0%, 30%)',
//   800: 'hsl(0, 0%, 20%)',
//   900: 'hsl(0, 0%, 10%)',
//   950: 'hsl(0, 0%, 5%)',
// },
