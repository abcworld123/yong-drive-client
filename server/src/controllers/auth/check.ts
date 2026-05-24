import { check } from 'services/auth/login';

// first check
export default async function controller(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
  const isLogin = req.session.isLogin === true || await check(req);
  res.json({ success: isLogin });
}
