import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/* everything that comes after this route is protected "/(.*)" */
const isProtectedRoute = createRouteMatcher([ "/signin/(.*)", "/signup/(.*)", "/freelancer/(.*)" ])

export default clerkMiddleware(async (auth, req) => {
    if(isProtectedRoute(req)) await auth.protect()
});

export const config = {
    // regexr language
    matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    ],
};