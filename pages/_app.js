import '../src/styles/globals.scss';
import { SessionProvider } from "next-auth/react"
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function MyApp({
  Component, pageProps: { session, ...pageProps }

}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ProgressBar
        height="4px"
        color="#000"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </SessionProvider>
  )
}