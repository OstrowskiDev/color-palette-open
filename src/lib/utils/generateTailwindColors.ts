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
      const hue = baseHue + (hueOffset.angle[i] ?? 0)
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
