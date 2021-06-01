import 'reflect-metadata';
import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import { authChecker, userParser } from './auth';
import { connect } from './db';

async function bootstrap() {
  await connect();

  const schema = await buildSchema({
    authChecker,
    authMode: 'null',
    emitSchemaFile: true,
    resolvers: [__dirname + '/resolvers/**/*.{ts,js}'],
  });

  const server = new ApolloServer({
    schema,
    playground: false,
    context: ({ ctx }) => ctx,
  });

  const app = new Koa();
  app.use(userParser);
  app.use(server.getMiddleware());
  const port = process.env.PORT || 4000;
  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
}

bootstrap().catch(console.error);
