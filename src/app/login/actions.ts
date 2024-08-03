'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    if (!email || typeof email != "string") {
        redirect("/error");
    }

    const password = formData.get("password") as string;
    if (!password || typeof password != "string") {
        redirect("/error");
    }

    if (email.length < 5 || password.length < 5) {
        redirect("/error");
    }

    const client = createClient();
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}
export async function signup(formData: FormData) {
    const email = formData.get("email") as string;
    if (!email || typeof email != "string") {
        redirect("/error");
    }

    const password = formData.get("password") as string;
    if (!password || typeof password != "string") {
        redirect("/error");
    }

    if (email.length < 5 || password.length < 5) {
        redirect("/error");
    }

    const client = createClient();
    const { error } = await client.auth.signUp({ email, password });
    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}