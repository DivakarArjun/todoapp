import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { httpResponse } from 'src/middleware/httpResponse';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/users.entity';
import { AuthService } from 'src/provider/auth/auth.service';
import { AuthModule } from 'src/provider/auth/auth.module';
import { Admin } from '../admin/entities/admin.entity';

@Module({
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([Task,User,Admin]),AuthModule],
  providers: [TasksService,httpResponse,AuthService],
  exports: [TasksService]
})
export class TasksModule {}
