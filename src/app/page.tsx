import { createClient } from '@/utils/supabase/server';

export default async function Uplouder() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user === null) {
    return "error unreachable";
  }
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}