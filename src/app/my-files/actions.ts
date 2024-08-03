'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function upload(formData: FormData) {
    const client = createClient();
    const { data: userData, error: userError } = await client.auth.getUser();
    if (userError || !userData?.user) {
      redirect('/login');
    }

    const file = formData.get("file") as File | null;
    if (file === null) {
        redirect('/error');
    }
    if (file.size == 0 || file.size > 2**12) {
        redirect('/error');
    }
    if (file.type != "text/plain") {
        redirect('/error');
    }

    const { data: uploadData, error: uploadError } = await client.storage
        .from("uplouder-files").upload(`${userData.user.id}/${file.name}`, file);

    if (uploadError) {
        redirect('/error');
    } else {
        const fileID = uploadData.id;
        revalidatePath("/my-files", "layout");
        redirect("/my-files");
    }
}