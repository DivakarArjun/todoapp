import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { DatabaseConnectionService } from './provider/database/postgres.connection';
import { AuthModule } from './provider/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/users/users.module';
import { Admin } from './modules/admin/entities/admin.entity';
import { User } from './modules/users/entities/users.entity';
import { Task } from './modules/tasks/entities/task.entity';

@Module({
  imports: [
    TasksModule,
    AdminModule,
    UserModule,
    TypeOrmModule.forRoot(DatabaseConnectionService),
    TypeOrmModule.forFeature([Admin,User,Task]),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
