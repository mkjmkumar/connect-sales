import type { AppProps } from 'next/app'
import '../styles/globals.css' // Make sure this file exists and imports Tailwind

function MyApp({ Component, pageProps }: AppProps) {
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set');
  return <Component {...pageProps} />
}

export default MyApp