import { compareSync } from 'bcrypt';
import config from 'config';
import { redisClient } from 'libs';
import getCid from 'utils/cidGenerator';
import type { ReqLogin } from 'types/apis';

// login page
export default async function controller(req: ExpressRequest<ReqLogin>, res: ExpressResponse, next: ExpressNextFunction) {
  const { pw } = req.body;
  if (compareSync(pw, config.auth.pw)) {
    const cid = getCid();
    await redisClient.setEx(cid, maxAge, '');
    res.cookie('cid', cid, { maxAge: maxAge * 1000 });
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
}

const maxAge = 30 * 24 * 60 * 60;  // 30 days
