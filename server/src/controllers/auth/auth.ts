import { check } from 'services/auth/login';

// all page middleware
export default async function controller(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  if (req.session.isLogin) next();
  else if (regex.some(x => x.test(req.url))) next();
  else if (await check(req)) next();
  else res.status(401).end();
}

const whitelist = ['/auth/login', '/auth/check'];  // todo 'share'
const regex = whitelist.map(path => new RegExp(`^${path}`));
