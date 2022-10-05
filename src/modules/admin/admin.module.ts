import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { httpResponse } from '../../middleware/httpResponse';
import { AuthService } from '../../provider/auth/auth.service';
import { AuthModule } from '../../provider/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity';
import { Task } from '../tasks/entities/task.entity';

@Module({
  controllers: [AdminController],
  providers: [AdminService, httpResponse, AuthService],
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      User,
      Task
    ]),
    AuthModule,
  ],
  exports: [AdminService],
})
export class AdminModule {}
