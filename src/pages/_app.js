import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NextIntlProvider} from 'next-intl';
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react"

import en from "../locales/en.json";
import id from "../locales/id.json";
const messages = {
  en,
  id,
};

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}) {
  const { locale } = useRouter();
  return (
    <SessionProvider session={session}>
      <NextIntlProvider locale={locale} messages={messages[locale]}>
        <Component {...pageProps} />
      </NextIntlProvider>
    </SessionProvider>
  );
}
