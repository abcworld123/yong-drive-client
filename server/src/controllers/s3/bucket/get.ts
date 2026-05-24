import { getBucketListCmd } from 'services/s3';
import type { ResBucketList } from 'types/apis';

export default async function controller(req: ExpressRequest, res: ExpressResponse<ResBucketList>, next: ExpressNextFunction) {
  const data = await getBucketListCmd();
  res.json(data);
}
