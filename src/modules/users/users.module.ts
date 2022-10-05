import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { httpResponse } from 'src/middleware/httpResponse';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from './entities/users.entity';
import { AuthModule } from 'src/provider/auth/auth.module';
import { AuthService } from 'src/provider/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),AuthModule],
  controllers: [UserController],
  providers: [UserService,httpResponse,AuthService],
  exports:[UserService]
})
export class UserModule {}
