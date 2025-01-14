import { Injectable } from '@nestjs/common';
import { Book } from './books.entity';
import { start } from 'repl';

@Injectable()
export class BooksService {

    private books: Book[] = [   // Declarando propriedade chamada  books do tipo Book
        {
            id: 11,
            title: 'Lagoa Azul',
            genre: 'Classic',
            tags: ['Classic', 'Autor', 'vintage', 'Tv']

        },
    ]

    findAll() {          // Retornar os registros da array books
        return this.books
    }

    findOne(id: number) {        //Passa o parametro para a busca
        return this.books.find(book => book.id === id)  //Busca o registro especifico
    }

    create(createBookDTO: Book) {    // Recebe os dados para criar um novo livro
        const newBook = { id: Date.now(), ...createBookDTO };
        this.books.push(createBookDTO)
    }

    update(id: number, updateBookDTO: Book) { //verifica se tem o curso que deseja atualizar
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) {
            throw new Error(`Book with ID ${id} not found`);
        }
        this.books[index] = { ...this.books[index], ...updateBookDTO };
        return this.books[index];
    }

    remove(id: number) {
        const index = this.books.findIndex(book => book.id === id);
        if (index === -1) {
          throw new Error(`Book with ID ${id} not found`);
        }
        this.books.splice(index, 1);
      }
}
