import { createConnection } from 'typeorm';

export const connect = async () => {
  await createConnection({
    type: 'mysql',
    charset: 'utf8mb4',
    host: process.env['DB_HOST'] || "172.21.16.17",
    port: Number(process.env['DB_PORT']) || 3306,
    database: 'hackbook',
    username: process.env['DB_USERNAME'] || "urie",
    password: process.env['DB_PASSWORD'] || 'youling',
    synchronize: true,
    logging: false,
    // logging: process.env['NODE_ENV'] !== 'production',
    entities: ['src/models/**/*.ts'],
  });
};
