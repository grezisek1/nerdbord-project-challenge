import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function MyFilesPage() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect('/login');
    }
    return <p>todo: {data.user.email} files list</p>;
  }
  