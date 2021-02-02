import { AuthChecker } from 'type-graphql';
import https from 'https';
import http from 'http';
import { JWT_SECRET, SSO_VERIFYCODE } from '../constants';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const authChecker: AuthChecker<Koa.Context, Enum.UserRole> = (
  { context },
  roles
) => context.user && roles.includes(context.user.role);

export const userParser = async (ctx: Koa.Context, next: any) => {
  const token = ctx.cookies.get('token');
  if (token) {
    const { userId } = jwt.verify(token, JWT_SECRET) as any;
    const user = await User.findOne({ id: userId });
    ctx.user = user;
  }
  await next();
};

export const makeToken = (user: User) =>
  jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: '50d',
  });

export const verifyCode = async (code: string) => {
  const url = new URL(SSO_VERIFYCODE);
  url.searchParams.set('code', code);
  const data: any = await httpGet(url);
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
};

function httpGet(url: any) {
  const httpModule = new URL(url).protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    const req = httpModule.get(url, (res) => {
      res.on('data', (body) => {
        try {
          resolve(JSON.parse(body.toString()));
        } catch (err) {
          reject(err);
        }
      });
      res.on('error', (err) => {
        reject(err);
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
}
