import { PresetSL } from '../utils/hue'
import { HueOffset } from '../utils/position'

interface ColorPalettesProps {
  baseHue: number
  hueOffset: HueOffset
  presetSL: PresetSL
}

export default function ColorPalettes({
  baseHue,
  hueOffset,
  presetSL,
}: ColorPalettesProps) {
  //get basic HSL values for all palettes:
  let hues = [baseHue, null, null]
  let sat = presetSL.sat
  let lightRange = presetSL.lightRange
  const paletteNum = hueOffset.angle.length

  if (hueOffset.angle[1]) {
    hues[1] = getHueValue(baseHue, hueOffset.angle[1])
  }
  if (hueOffset.angle[2]) {
    hues[2] = getHueValue(baseHue, hueOffset.angle[2])
  }

  function getHueValue(baseHue: number, angle: number): number {
    const initialHue = baseHue + angle
    if (initialHue < 0) return 360 + initialHue
    if (initialHue >= 360) return initialHue - 360
    return initialHue
  }

  function calcLightness(lightRange: [number, number], i: number): number {
    const [start, end] = lightRange
    const steps = 10 // dla TW 11x HSL, więc 10 steps
    const value = start + (end - start) * (i / steps)
    return Math.round(value)
  }

  function generatePalettes() {
    let palettes = []
    for (let i = 0; i < paletteNum; i++) {
      let colorPalette = []
      for (let j = 0; j < 11; j++) {
        const lightnes = lightRange[j]
        colorPalette.push([hues[i], sat, lightnes])
      }
      palettes.push(colorPalette)
    }
    return palettes
  }

  const palettes = generatePalettes()

  return (
    <div className="color-palettes">
      {palettes.map((palette, i) => {
        return (
          <div className="palette flex flex-row m-1 w-full" key={i}>
            {palette.map((color, i) => {
              return (
                <div
                  className={`color-hsl mx-[1px] w-6 h-12`}
                  key={i}
                  style={{
                    backgroundColor: `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`,
                  }}
                ></div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
