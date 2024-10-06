import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">Welcome to SalesConnect</CardTitle>
          <CardDescription className="text-center text-lg mt-2">Your all-in-one sales management solution</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-lg">
            Streamline your sales process and boost your team's productivity with SalesConnect.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="px-8 py-2 text-lg">
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}