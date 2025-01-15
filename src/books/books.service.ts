import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './books.entity';
import { BOOKS } from './books.mock';

@Injectable()
export class BooksService {
    books = BOOKS;



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

    create(createBookDTO: Book): Book { // Adiciona o tipo de retorno 
        const newBook: Book = { id: Date.now(), ...createBookDTO };
        this.books.push(newBook);
        return newBook; // Retorna o novo livro criado 
    }
    update(id: number, updateBookDTO: Book) { //verifica se tem o curso que deseja atualizar
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        this.books[index] = { id, ...updateBookDTO };
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
