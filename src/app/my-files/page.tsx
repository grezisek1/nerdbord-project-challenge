import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { upload } from './actions';
import Download from './download';


export default async function MyFilesPage() {
  const client = createClient();
  const { data: userData, error: userError } = await client.auth.getUser();
  if (userError || !userData?.user) {
    redirect('/login');
  }
  const { data: filesData, error: filesError } = await client.storage
    .from("uplouder-files").list(userData.user.id);

  const filesMarkups = [];
  if (filesData) {
    for (let file of filesData) {
      filesMarkups.push(
        <dt key={`file-${file.id}`}>{file.name}</dt>,
        <dd key={`details-${file.id}`}>
          Modified: {file.updated_at}
          <Download fileName={file.name} />
        </dd>,
      );
    }
  } else {
    filesMarkups.push(
      <dt>Nothing yet</dt>,
      <dd>Upload something first</dd>,
    );
  }

  
  return (<>
    <form>
      <fieldset>
        <legend>Upload file</legend>
        <label>
          File:
          <input id="file" name="file" type="file" accept="text/plain" required />
        </label>
        <button formAction={upload}>Upload</button>
      </fieldset>
    </form>

    <form>
      <fieldset>
        <legend>Your files:</legend>
        <dl id="files">{filesMarkups}</dl>
      </fieldset>
    </form>
  </>);
}
