import { useEffect } from 'react';
import api from 'utils/api';
import type { DownloaderProps } from 'types/props';

function getDownloadFilename(bucket: string, path: string, filenames: string[]) {
  if (filenames?.length === 1) return filenames[0];
  const segments = path.split('/').filter(Boolean);
  const folder = segments[segments.length - 1] || bucket;
  return `${folder}.zip`;
}

export default function Downloader({ body }: DownloaderProps) {
  useEffect(() => {
    if (!body) return;

    const { bucket, path, filenames } = body;

    api.post('/s3/object/download', { bucket, path, filenames }, { responseType: 'blob' })
      .then(({ data }) => {
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = getDownloadFilename(bucket, path, filenames);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(err => console.error(err));
  }, [body]);

  return null;
}
