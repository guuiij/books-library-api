import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/books.entity';
import { Tag } from './entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book,Tag])], // Importante TypeOrmModule e configurando para trabalahr com a entidade BOOK
  controllers: [BooksController],
  providers: [BooksService]


})
export class BooksModule {}
