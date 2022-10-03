import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { DatabaseConnectionService } from './provider/database/postgres.connection';
import { AuthModule } from './provider/auth/auth.module';

@Module({
  imports: [BooksModule,
    TypeOrmModule.forRoot(DatabaseConnectionService),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
