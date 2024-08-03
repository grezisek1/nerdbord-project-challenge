import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { upload } from './actions';

export default async function MyFilesPage() {
  const client = createClient();
  const { data, error } = await client.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  return (
    <form>
      <label>
        File:
        <input id="file" name="file" type="file" accept="text/plain" required />
      </label>
      <button formAction={upload}>Upload file</button>
    </form>
  );
}
