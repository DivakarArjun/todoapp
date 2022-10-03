import { Module } from '@nestjs/common';
import { BooksModule } from 'src/modules/books/books.module';
import { AuthService } from './auth.service';

@Module({
  imports: [BooksModule],
  providers: [AuthService]
})
export class AuthModule {}
