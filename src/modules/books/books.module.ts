import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { httpResponse } from 'src/middleware/httpResponse';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService,httpResponse]
})
export class BooksModule {}
