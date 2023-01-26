/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      title: 'BG Prediction',
      titleDescription: 'Blood Glucose Level Prediction'
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    localeDetection: false,
  },
}

module.exports = nextConfig
