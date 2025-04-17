import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                    }
                },
            },
        }
    )
}


export async function getUser() {
    const { auth } = await createSupabaseClient()

    const user = (await auth.getUser()).data.user;
    // console.log("user", user);

    return user
}


export async function protectRoute() {
    const user = await getUser()
    if (!user) {
        throw new Error('Unauthorized!')
    }
}

