import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from 'src/books/dto/create-book.dto';
import { UpdateBookDTO } from 'src/books/dto/upadate-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { } // construtor

    // Método LISTA TODOS OS LIVROS
    @Get()
    findAll() {
        return this.booksService.findAll()
    }

    // Método RETORNAR 1 LIVRO 
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.booksService.findOne(id)
    }

    // Método ADICIONA LIVROD
    @Post()
    create(@Body() createBookDTO: CreateBookDTO) {   // Chamamos a variavel com o mesmo nome do TIPO dela
        const newBook = this.booksService.create(createBookDTO);
        return { message: 'Book Created', newBook }; // Retorna uma resposta útil 
    }

    // Atualiza Data
    @Put(':id')
    update(@Param('id') id: number, @Body() updateBookDTO: UpdateBookDTO) {
        const updateBook = this.booksService.update(Number(id), updateBookDTO);
        return { message: 'Book Updated', updateBook };
    }

    //Deletando Livro
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param('id') id: string) {
        this.booksService.remove(Number(id));
        return { message: 'Book Deleted' };
    }



}
