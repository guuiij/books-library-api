import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/books.entity';
import { Tag } from './entities/tags.entity';
import { Author } from './entities/authors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book,Tag,Author])], // Importante TypeOrmModule e configurando para trabalhar com a entidade BOOK
  controllers: [BooksController],
  providers: [BooksService]


})
export class BooksModule {}
