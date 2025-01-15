import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';

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
    @Post() create(@Body() body: any) {
        const newBook = this.booksService.create(body);
        return { message: 'Book Created', newBook }; // Retorna uma resposta útil 
    }

    // Atualiza Data
    @Put(':id') update(@Param('id') id: string, @Body() bookDto: any) {
        const updatedBook = this.booksService.update(Number(id), bookDto);
        return { message: 'Book Updated', updatedBook };
    }

    //Deletando Livro
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id') remove(@Param('id') id: string) {
        this.booksService.remove(Number(id));
        return { message: 'Book Deleted' };
    }



}
