import { logger } from '@/shared/lib/logger'

export interface Features {
  contactForm: boolean
}

const defaults: Features = {
  contactForm: false,
}

export async function getFeatures(): Promise<Features> {
  if (!process.env.EDGE_CONFIG) {
    return {
      ...defaults,
      contactForm: process.env.FEATURE_CONTACT_FORM === 'true',
    }
  }

  try {
    const { get } = await import('@vercel/edge-config')
    const overrides = await get<Partial<Features>>('features')
    if (!overrides) return defaults
    logger.info('features:edge-config-hit', { features: overrides })
    return { ...defaults, ...overrides }
  } catch (err) {
    logger.error('features:edge-config-error', { error: String(err) })
    return defaults
  }
}
