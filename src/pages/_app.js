import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NextIntlProvider} from 'next-intl';
import { useRouter } from "next/router";

import en from "../locales/en.json";
import id from "../locales/id.json";
const messages = {
  en,
  id,
};


export default function App({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
    <NextIntlProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} />
    </NextIntlProvider>
  );
  // return <Component {...pageProps} />
  // return (
  //   <NextIntlProvider messages={pageProps.messages}>
  //     <Component {...pageProps} />
  //   </NextIntlProvider>
  // );
}
