import { Resolver, Query, Arg, Ctx, ObjectType, Field } from 'type-graphql';
import { User } from '../models/User';
import { makeToken, verifyCode } from '../auth/';
import { SSO_AUTH } from '../constants/';

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
      const code = ctx.request.query.code;
      if (!code) throw new Error('query code required');
      // login by sso service
      const { id } = await verifyCode(code);
      const token = makeToken({ id } as User);
      ctx.cookies.set('token', token, { maxAge: 1000 * 3600 * 24 * 3 });
      ctx.redirect(loginReturnTo);
      return { message: 'redirect to original page' };
    } catch ({ message }) {
      const redirectTo = addQuery(ctx.href, ctx.request.body);
      const redirect = addQuery(SSO_AUTH, { redirectTo });
      return { message, redirect };
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
