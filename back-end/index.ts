import 'reflect-metadata';
import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { authChecker, userParser } from './auth';

const getEnv = (name: string) => process.env[name] as any;

async function bootstrap() {
  await createConnection();

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
  // app.use(ssoLoginRoute('/login'));
  app.use(server.getMiddleware());
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

bootstrap().catch(console.error);
