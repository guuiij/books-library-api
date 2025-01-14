import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('books')
export class BooksController {

    // Método LISTA TODOS OS LIVROS
    @Get()
    findAll() {
        return 'List of All Books';
    }

    // Método RETORNAR 1 LIVRO
    @Get(':id')
    findOne(@Param('id') id: string) {
        return `Book with ID ${id}`;
    }

    // Método ADICIONA LIVROD
    @Post()
    create(@Body() bookDto: any) {
        return `Book Created ${bookDto}`;
    }

    // Atualiza Data
    @Put(':id')
    update(@Param('id')id: string , @Body() bookDto: any){
        return `Book with ID ${id} updated`;
    }

    //Deletando Livro
    @Delete(':id')
    remove(@Param('id') id: string) {

    }



}
