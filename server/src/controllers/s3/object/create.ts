import { redisClient } from 'libs';
import { createFolderCmd } from 'services/s3';
import type { ReqCreate, ResWithErrMsg } from 'types/apis';

export default async function controller(req: ExpressRequest<ReqCreate>, res: ExpressResponse<ResWithErrMsg>, next: ExpressNextFunction) {
  const body = req.body;
  const { bucket, path } = body;
  const data = await createFolderCmd(body);
  await redisClient.del(`${bucket}/${path}`);
  res.json(data);
}
