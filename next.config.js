/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
      NEXT_PUBLIC_API_URL: 'https://web-production-fd66.up.railway.app',
      // NEXT_PUBLIC_API_URL: 'http://127.0.0.1:5000/',
      title: 'BG Prediction',
      titleDescription: 'Blood Glucose Level Prediction',
      GOOGLE_ID: '113022362279-n6u9fv5c5fkgs67862ii1bfau70jlmvh.apps.googleusercontent.com',
      GOOGLE_SECRET: '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',
      FACEBOOK_ID: '1715985032131731',
      FACEBOOK_SECRET: '67b8d08ed090af655dfe58b406ccec66',
      // TWITTER_ID: 'SwOLOls5vumofGyCrVBdCA41A',
      // TWITTER_SECRET: 'Skv3AGh2luwNreYtiRJCpZ9pZ9UA4kQO6gKV9ZRYuR1oG3PxWZ',
      AUTH0_ID: 'W3lILv4uSTC3l52YXHdH0QbCplY9as1Q',
      AUTH0_SECRET: 'aQ8jzJXqDyyQQDdkhM2S_Qe1YC9sWoSdICv6EyG7SWSu4PjOzAs3w2Q7vb2W-Gl4',
      AUTH0_ISSUER: 'dev-pea57wz8xxzi0gts.us.auth0.com',
      NEXTAUTH_SECRET: '376763'

  },
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    localeDetection: false,
  },
}

module.exports = nextConfig
