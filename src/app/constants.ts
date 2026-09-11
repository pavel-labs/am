export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pavel Piatrovich',
  jobTitle: 'Frontend Engineer',
  url: SITE_URL,
  email: 'pasha.petrovich98@gmail.com',
  sameAs: ['https://github.com/pavel-labs', 'https://linkedin.com/in/pavel-software-anywhere'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Warsaw',
    addressCountry: 'PL',
  },
  knowsAbout: ['React', 'React Native', 'TypeScript', 'JavaScript', 'Frontend Engineering'],
}
