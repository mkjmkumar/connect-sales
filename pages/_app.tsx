import type { AppProps } from 'next/app'
import '../styles/globals.css' // Make sure this file exists and imports Tailwind

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp