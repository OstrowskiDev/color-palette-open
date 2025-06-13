import { writeFileSync } from 'fs'
import path from 'path'

export async function POST(req) {
  const body = await req.json()
  const { colorsObject } = body

  if (!colorsObject) {
    return Response.json({ message: 'Missing colorsObject' }, { status: 400 })
  }

  const fileContent =
    'export const testColors = ' + JSON.stringify(colorsObject, null, 2) + '\n'

  const filePath = path.join(process.cwd(), 'src/lib/tailwind/testColors.js')

  try {
    writeFileSync(filePath, fileContent, 'utf8')
    return Response.json({ message: 'File written successfully' })
  } catch (error) {
    console.error('Write error:', error)
    return Response.json({ message: 'Failed to write file' }, { status: 500 })
  }
}
