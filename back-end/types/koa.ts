declare namespace Koa {
  type ExtendableContext = import('koa').ExtendableContext;

  type IFieldResolver<
    TSource,
    TContext,
    TArgs
  > = import('apollo-server-koa').IFieldResolver<TSource, TContext, TArgs>;

  type User = import('../models/User').User;

  interface Context extends ExtendableContext {
    user: User;
  }

  type Next = import('koa').Next;
}
