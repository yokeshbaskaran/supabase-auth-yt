"use server"

import { createSupabaseClient } from "../auth/server";
import { getErrorMessage } from "../lib/utlis"

export async function createAccountAction(formData: FormData) {
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const { auth } = await createSupabaseClient()

        const data = { email, password }
        const { error } = await auth.signUp(data)
        if (error) throw error;

        return { errorMessage: null }
    } catch (error) {
        return { errorMessage: getErrorMessage(error) }
    }
}

export async function loginAction(formData: FormData) {
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const { auth } = await createSupabaseClient()

        const data = { email, password }
        const { error } = await auth.signInWithPassword(data)
        if (error) throw error;

        return { errorMessage: null }
    } catch (error) {
        return { errorMessage: getErrorMessage(error) }
    }
}

export async function signOutAction() {
    try {
        const { auth } = await createSupabaseClient()

        const { error } = await auth.signOut()
        if (error) throw error;

        return { errorMessage: null }
    } catch (error) {
        return { errorMessage: getErrorMessage(error) }
    }
}