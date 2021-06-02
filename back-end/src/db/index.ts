import { createConnection } from 'typeorm';

export const connect = async () => {
  await createConnection({
    type: 'mysql',
    host: process.env['TYPEORM_HOST'],
    database: 'hackbook',
    username: process.env['TYPEORM_USERNAME'] || 'root',
    password: process.env['TYPEORM_PASSWORD'],
    synchronize: true,
    logging: true,
    entities: ['src/models/**/*.ts'],
  });
};
