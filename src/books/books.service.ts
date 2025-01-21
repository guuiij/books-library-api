import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/books.entity';
import { BOOKS } from './books.mock';
import { CreateBookDTO } from 'src/books/dto/create-book.dto';
import { UpdateBookDTO } from 'src/books/dto/upadate-book.dto';

@Injectable()
export class BooksService {
    private books = BOOKS;
    private currentId: number = 0;



    findAll(): Book[] {          // Retornar os registros da array books
        return this.books
    }

    findOne(bookId: number) {        //Passa o parametro para a busca
        let id = Number(bookId);
        const book = this.books.find(book => book.id === id);
        if (!book) {
            throw new NotFoundException(`Book ID ${id} not found.`);
        }
        return book; // Retorna diretamente o livro encontrado
    }

    create(createBookDTO: any) { // Adiciona o tipo de retorno 
        //  this.currentId += 1;
        //   const newBook: Book = {id: this.currentId, ...createBookDTO };    //ID TEMPORARIO ENQUANTO NAO APLICA O WHITELIST
        this.books.push(createBookDTO);  //AJUSTAR PARA PURSH RECEBER DIRETO O CREATEBOOKDTO
        return createBookDTO; // Retorna o novo livro criado 
    }
    update(id: number, updateBookDTO: UpdateBookDTO) { //verifica se tem o curso que deseja atualizar
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        this.books[index] = { ...this.books[index], ...updateBookDTO };
        return this.books[index];
    }

    remove(id: number) {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        this.books.splice(index, 1);
    }
}
