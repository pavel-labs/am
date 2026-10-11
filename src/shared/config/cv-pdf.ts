export const CV_PDF_FILENAME = 'pavel-piatrovich-cv.pdf'
export const CV_NO_PHOTO_PDF_FILENAME = 'pavel-piatrovich-cv-no-photo.pdf'

export function cvPdfFilename(variant: string | null): string {
  return variant === 'no-photo' ? CV_NO_PHOTO_PDF_FILENAME : CV_PDF_FILENAME
}
