import { type NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { cvPdfFilename } from '@/shared/config/cv-pdf'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const fileName = cvPdfFilename(req.nextUrl.searchParams.get('variant'))

  try {
    const filePath = join(process.cwd(), 'public', fileName)
    const buffer = await readFile(filePath)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return NextResponse.redirect(new URL(`/${fileName}`, req.url))
  }
}
