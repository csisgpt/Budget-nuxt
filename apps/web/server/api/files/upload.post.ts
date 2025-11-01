import { createError, defineEventHandler } from 'h3';
import formidable from 'formidable';
import { useMinio } from '../../utils/storage';
import { requireUserSession } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const form = formidable({ multiples: false, maxFileSize: 10 * 1024 * 1024 });
  const [fields, files] = await form.parse(event.node.req);
  const file = files.file?.[0];
  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' });
  }
  const client = useMinio();
  const bucket = process.env.MINIO_BUCKET || 'orgaflow';
  if (!(await client.bucketExists(bucket))) {
    await client.makeBucket(bucket, 'us-east-1');
  }
  await client.fPutObject(bucket, file.originalFilename || file.newFilename, file.filepath, {
    'Content-Type': file.mimetype
  });
  return {
    url: `${process.env.MINIO_PUBLIC_URL || 'http://localhost:9000'}/${bucket}/${file.originalFilename}`
  };
});
