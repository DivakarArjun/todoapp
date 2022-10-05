import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { Session } from 'inspector';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { User } from 'src/modules/users/entities/users.entity';
import { Admin } from 'src/modules/admin/entities/admin.entity';
// configure the environment
dotenv.config({
  path: resolve(__dirname, `../../../bin/.env.local`),
});
export const DatabaseConnectionService: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DATABASE_NAME,
  //   // autoLoadEntities: true,
  logging: ['error', 'migration', 'query', 'warn'],
  logger: 'advanced-console',
  entities: [
    Session,
    Task,
    User,
    Admin
  ],
  synchronize: false,
  migrationsRun: true,
  migrations: ['dist/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  // ssl:
  //   process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'e2e'
  //     ? false
  //     : {
  //         rejectUnauthorized: false,
  //       },
};
