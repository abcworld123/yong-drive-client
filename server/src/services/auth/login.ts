import { redisClient } from 'libs';

export async function check(req: ExpressRequest) {
  const cid = req.cookies?.cid;
  const isLogin = cid ? (await redisClient.get(cid)) !== null : false;
  return isLogin;
}
