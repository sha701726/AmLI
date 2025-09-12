import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  
  // Block common download tools and bots
  const suspiciousUserAgents = [
    'wget', 'curl', 'python', 'requests', 'urllib', 'scrapy', 'beautifulsoup',
    'selenium', 'phantomjs', 'headless', 'bot', 'crawler', 'spider',
    'httrack', 'webcopier', 'offline', 'downloader', 'grabber',
    'python-requests', 'scrapy', 'beautifulsoup', 'selenium', 'phantomjs',
    'headless-chrome', 'puppeteer', 'playwright'
  ];
  
  const isSuspicious = suspiciousUserAgents.some(agent => 
    userAgent.toLowerCase().includes(agent.toLowerCase())
  );
  
  if (isSuspicious) {
    return new NextResponse('Access Denied - Automated tools not allowed', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  
  // Block requests with no user agent
  if (!userAgent || userAgent.trim() === '') {
    return new NextResponse('Access Denied - No user agent', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  
  // Block suspicious referrers
  const suspiciousReferrers = ['scraper', 'downloader', 'grabber', 'bot', 'crawler'];
  const isSuspiciousReferrer = suspiciousReferrers.some(ref => 
    referer.toLowerCase().includes(ref.toLowerCase())
  );
  
  if (isSuspiciousReferrer) {
    return new NextResponse('Access Denied - Suspicious referrer', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  
  // Add security headers
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', 
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; img-src 'self' data:; font-src 'self' https://cdnjs.cloudflare.com;"
  );
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
