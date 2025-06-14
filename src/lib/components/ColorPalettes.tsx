import { HueOffset, PresetSL } from '@/types/palette'

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

  // poniżej korekta jasności dla ciemnoniebieksich barw, oraz jasnych żółci
  // wykorzystuje gaussian do płynnych przejść
  // !!!! może warto byłoby dodać opcję do włączania/wyłączanie tej korekty w UI
  function correctHueLuminanceBias(hue: number): number {
    function gaussian(
      x: number,
      mean: number,
      sigma: number,
      amplitude: number,
    ): number {
      return amplitude * Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2))
    }

    // żółty: osłabia jasność w okolicy 8° od 55°
    const yellowBias = gaussian(hue, 55, 8, -2)
    // niebieski: rozjaśnia w okolicy 12° od 240°
    const blueBias = gaussian(hue, 240, 12, 16)

    return yellowBias + blueBias
  }

  function getCorrectedLightRange(hue: number, baseRange: number[]) {
    const correction = correctHueLuminanceBias(hue)
    return baseRange.map((l) => Math.min(100, Math.max(0, l + correction)))
  }

  function generatePalettes() {
    let palettes = []
    for (let i = 0; i < paletteNum; i++) {
      let colorPalette = []
      for (let j = 0; j < 11; j++) {
        const correctedLightness = getCorrectedLightRange(hues[i]!, lightRange)
        const lightnes = correctedLightness[j]
        // const lightnes = lightRange[j]
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
