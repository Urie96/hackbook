import { Resolver, Query, Arg, Ctx, ObjectType, Field } from 'type-graphql';
import { User } from '../models/User';
import { makeToken, verifyCode } from '../auth/';
import { SSO_AUTH } from '../constants/';
import { decrypt } from '../utils';

@ObjectType()
class LoginResponse {
  @Field()
  message: string;

  @Field({ nullable: true })
  redirect?: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => LoginResponse)
  async login(
    @Arg('loginReturnTo') loginReturnTo: string,
    @Ctx() ctx: Koa.Context
  ) {
    if (ctx.user) {
      const token = makeToken(ctx.user);
      ctx.cookies.set('token', token, { maxAge: 1000 * 3600 * 24 * 3 });
      return { message: 'success' };
    }
    try {
      let code = ctx.request.query.code;
      if (Array.isArray(code)) code = code[0];
      if (!code) throw new Error('query code required');
      // login by sso service
      const { id } = await verifyCode(code);
      const token = makeToken({ id } as User);
      ctx.cookies.set('token', token, { maxAge: 1000 * 3600 * 24 * 3 });
      ctx.redirect(loginReturnTo);
      return { message: 'redirect to original page' };
    } catch ({ message }) {
      const redirectTo = addQuery(ctx.href.replace("http://", "https://"), ctx.request.body);
      const redirect = addQuery(SSO_AUTH, { redirectTo });
      return { message, redirect };
    }
  }

  @Query(() => LoginResponse)
  async guestLogin(@Arg('token') token: string, @Ctx() ctx: Koa.Context) {
    try {
      const expiresIn = Number(decrypt(token)) * 1000 - new Date().valueOf();
      if (expiresIn < 0) {
        return { message: 'expired visitor token' };
      }
      ctx.cookies.set('token', makeToken({} as User, String(expiresIn)));
      return { message: 'success' };
    } catch (error) {
      console.log(error.message);
      return { message: 'invalid visitor token' };
    }
  }
}

function addQuery(url: string, query: { [key: string]: string }) {
  const res = new URL(url);
  Object.keys(query).forEach((key) => {
    res.searchParams.set(key, query[key]);
  });
  return res.toString();
}
