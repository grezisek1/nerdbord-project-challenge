"use client"

import { useFormState } from 'react-dom';
import { download } from './actions';

const initialDownloadState = null;
export default function Download(props: any) {
    const [state, formAction] = useFormState(download.bind(null, props.fileName), initialDownloadState);
    if (state !== null) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([state]));
        link.download = props.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (<>
        <button type="submit" formAction={formAction}>
            Download
        </button>
    </>);
}