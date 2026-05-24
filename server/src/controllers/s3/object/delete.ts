import { redisClient } from 'libs';
import { deleteRecursiveCmd } from 'services/s3';
import type { ReqDelete, ResDefault } from 'types/apis';

export default async function controller(req: ExpressRequest<ReqDelete>, res: ExpressResponse<ResDefault>, next: ExpressNextFunction) {
  const body = req.body;
  const { bucket, path } = body;
  const data = await deleteRecursiveCmd(body);
  const delKeys = await redisClient.keys(`${bucket}/${path}*`);
  await Promise.all(delKeys.map(key => redisClient.del(key)));
  res.json(data);
}
