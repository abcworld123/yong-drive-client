import { redisClient } from 'libs';
import { getObjectListCmd } from 'services/s3';
import type { ReqGet, ResObjectList } from 'types/apis';

export default async function controller(req: ExpressRequest<ReqGet>, res: ExpressResponse<ResObjectList>, next: ExpressNextFunction) {
  const body = req.body;
  const { bucket, path } = body;
  const cached = await redisClient.get(`${bucket}/${path}`) as string | null;

  if (cached) {
    const data = { success: true, objects: JSON.parse(cached) };
    res.json(data);
  } else {
    const data = await getObjectListCmd(body);
    redisClient.setEx(`${bucket}/${path}`, 86400, JSON.stringify(data.objects)).catch(console.error);
    res.json(data);
  }
}
