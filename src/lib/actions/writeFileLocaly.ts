'use server'

import { TailwindColors } from '@/types/palette'
import { writeFileSync } from 'fs'
import path from 'path'

export async function writeFileLocaly(
  colorsObject: TailwindColors,
  pathToTwFile: string,
) {
  if (!colorsObject) return { message: 'Incorrect data' }
  const fileContent =
    'export const testColors = ' + JSON.stringify(colorsObject, null, 2) + '\n'

  const filePath = path.join(process.cwd(), 'src/lib/tailwind/testColors.js')
  try {
    writeFileSync(filePath, fileContent, 'utf8')
    return { message: 'File written successfully' }
  } catch (error) {
    console.error('Write error:', error)
    return { message: 'Failed to write file' }
  }
}
