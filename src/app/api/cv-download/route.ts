import { type NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { logger } from '@/shared/lib/logger'
import { cvPdfFilename } from '@/shared/config/cv-pdf'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const fileName = cvPdfFilename(req.nextUrl.searchParams.get('variant'))

  logger.info('cv:download', {
    country: req.headers.get('x-vercel-ip-country') ?? '-',
    ua: req.headers.get('user-agent') ?? '-',
    ref: req.headers.get('referer') ?? '-',
  })

  try {
    const filePath = join(process.cwd(), 'public', fileName)
    const buffer = await readFile(filePath)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': String(buffer.length),
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch {
    return NextResponse.redirect(new URL(`/${fileName}`, req.url))
  }
}
