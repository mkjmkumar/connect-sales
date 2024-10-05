import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to SalesConnect</h1>
        <Link href="/login" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
          Login
        </Link>
      </div>
    </div>
  )
}