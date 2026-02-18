import { NextRequest, NextResponse } from 'next/server';

// Ensure the external API base URL is configured
const EXTERNAL_API_BASE_URL = "http://localhost:8001";
console.log('ehtesham1')

if (!EXTERNAL_API_BASE_URL) {
  console.error('EXTERNAL_API_BASE_URL is not defined. Please set it in your environment variables.');
  // In a real application, you might want to throw an error or handle this more gracefully.
  // For now, we'll proceed but requests will likely fail.
}

/**
 * Handles all incoming requests (GET, POST, PUT, DELETE, etc.) to /api/v1/*
 * and proxies them to the configured EXTERNAL_API_BASE_URL.
 */
export async function handler(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Reconstruct the original path from the Next.js dynamic route segment
    const { path: dynamicPath } = await params; // Await the params object itself
    const path = dynamicPath.join('/');
    const query = req.nextUrl.search; // Includes the '?' at the start

    // Construct the full URL for the external backend
    // The incoming request path already stripped the '/api/' part, so we need to re-add it if the backend expects it.
    const externalUrl = `${EXTERNAL_API_BASE_URL}/api/${path}${query}`;
    console.log('Proxying request to:', externalUrl); // Added log

    // Prepare the options for the forwarded request
    const requestOptions: RequestInit = {
      method: req.method,
      // You might want to filter headers, but for a simple proxy, forwarding most is common.
      // Be careful not to forward sensitive headers that should only be between client and proxy.
      headers: new Headers(req.headers),
      // For POST, PUT, PATCH requests, forward the body
      body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined,
      // Disable caching for proxy requests by default to ensure fresh data
      cache: 'no-store',
    };

    // Remove headers that might cause issues or are not relevant for proxying
    // For example, 'host' should reflect the target server, not the proxy.
    requestOptions.headers.delete('host');
    // 'Content-Length' will be recalculated by the fetch API if body is provided
    requestOptions.headers.delete('content-length');

    // Make the request to the external backend
    const externalResponse = await fetch(externalUrl, requestOptions);

    // Reconstruct the response to send back to the client
    const responseHeaders = new Headers(externalResponse.headers);

    // Remove Transfer-Encoding header as it might interfere with Next.js's response handling
    // or if the proxy modifies the body.
    responseHeaders.delete('transfer-encoding');

    return new NextResponse(externalResponse.body, {
      status: externalResponse.status,
      statusText: externalResponse.statusText,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Proxy error making external request:', error); // More specific error message
    // Also return the error message in the response for better debugging
    return NextResponse.json(
      { message: 'Internal Server Error', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Export specific handlers for each HTTP method if you need different logic per method.
// Otherwise, the single 'handler' function can handle all of them by default.
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;
export const HEAD = handler;



