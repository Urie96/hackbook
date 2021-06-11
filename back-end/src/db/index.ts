import { createConnection } from 'typeorm';

export const connect = async () => {
  await createConnection({
    type: 'mysql',
    charset: 'utf8mb4',
    host: process.env['TYPEORM_HOST'],
    database: 'hackbook',
    username: process.env['TYPEORM_USERNAME'],
    password: process.env['TYPEORM_PASSWORD'],
    synchronize: true,
    // logging: process.env['NODE_ENV'] !== 'production',
    logging: false,
    entities: ['src/models/**/*.ts'],
  });
};
