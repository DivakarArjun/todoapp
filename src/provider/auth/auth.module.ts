import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'src/modules/admin/admin.module';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { TasksModule } from 'src/modules/tasks/tasks.module';
import { User } from 'src/modules/users/entities/users.entity';
import { UserModule } from 'src/modules/users/users.module';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { JwtAdminStrategy, JwtBothStrategy, JwtUserStrategy } from './jwt.strategy';
dotenv.config({
  path: resolve(__dirname, `../../../bin/.env.local`),
});
@Module({
  imports: [TypeOrmModule.forFeature([  Admin,
    User,
    Task]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    })
  ],
  providers: [AuthService,
    JwtAdminStrategy,
    JwtBothStrategy,
    JwtUserStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
