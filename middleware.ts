import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

    const response = NextResponse.next({
        request: {
            headers: request.headers
        }
    })

    const url = new URL(request.url)
    const path = url.pathname;
    // console.log("path", path);

    const protectedRoutes = ["/upload-img"];
    const authRoutes = ["/authpage"];

    const isProtectedRoute = protectedRoutes.includes(path);

    const isAuthRoute = authRoutes.includes(path);

    if (isProtectedRoute || isAuthRoute) {
        const user = await getUser(request, response);

        if (isProtectedRoute && !user) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (isAuthRoute && user) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

async function getUser(request: NextRequest, response: NextResponse) {
    const supabaseClient = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll().map((cookie) => ({
                        name: cookie.name,
                        value: cookie.value,
                    }));
                },
                setAll(cookies) {
                    for (const cookie of cookies) {
                        response.cookies.set(cookie);
                    }
                },
            },
        }
    );

    const user = (await supabaseClient.auth.getUser()).data.user;
    return user;
}
