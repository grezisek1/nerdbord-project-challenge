import { createClient } from '@/utils/supabase/server';

export default async function Uplouder() {
  const supabase = createClient();
  const { data } = await supabase.from("test").select();

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}