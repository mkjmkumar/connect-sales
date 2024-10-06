import type { AppProps } from 'next/app'
import { Inter as FontSans } from "next/font/google"
import '../styles/globals.css'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${fontSans.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp