import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: (req) => !!req.nextauth.token,
  },
});

export const config = { matcher: ['/dashboard', '/companies/:path*', '/leads/:path*', '/deals/:path*'] };