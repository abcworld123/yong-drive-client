import type { RequestData, ResponseData } from './apis';
import type { Request, Response, NextFunction } from 'express';

declare global {
  // env
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_PASSWORD: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      SESSION_SECRET: string;
    }
  }
  // express
  type ExpressRequest<T extends RequestData = any> = Request<T['params'], null, T['body'], T['query']>;
  type ExpressResponse<T extends ResponseData = any> = Response<T>;
  type ExpressNextFunction = NextFunction;
}

declare module 'express-session' {
  interface SessionData {
    isLogin: boolean;
  }
}
