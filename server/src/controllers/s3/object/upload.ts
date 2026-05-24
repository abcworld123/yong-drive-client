import { PassThrough } from 'stream';
import { redisClient } from 'libs';
import { uploadObjectCmd } from 'services/s3';
import type { ReqUpload, ResDefault } from 'types/apis';

export default async function controller(req: ExpressRequest<ReqUpload>, res: ExpressResponse<ResDefault>, next: ExpressNextFunction) {
  const params = req.query;
  const { bucket, path } = params;
  const fileStream = new PassThrough();
  req.pipe(fileStream);
  const data = await uploadObjectCmd(params, fileStream);
  await redisClient.del(`${bucket}/${path}`);
  res.json(data);
}
