import { redisClient } from 'libs';
import { pasteObjectCmd } from 'services/s3';
import type { ReqPaste, ResDefault } from 'types/apis';

export default async function controller(req: ExpressRequest<ReqPaste>, res: ExpressResponse<ResDefault>, next: ExpressNextFunction) {
  const body = req.body;
  const { bucket, mode, pathFrom, pathTo } = body;
  const data = await pasteObjectCmd(body);
  if (mode === 'cut') {
    await redisClient.del(`${bucket}/${pathFrom}`);
  }
  await redisClient.del(`${bucket}/${pathTo}`);
  res.json(data);
}
