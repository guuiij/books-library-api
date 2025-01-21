import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/books.entity';
import { BOOKS } from './books.mock';
import { UpdateBookDTO } from 'src/books/dto/upadate-book.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDTO } from './dto/create-book.dto';

@Injectable()       // Marca a classe BooksService como serivcel injetavel
export class BooksService {
    constructor(
        @InjectRepository(Book) // Injetar o repositório correspondendo a entidade BOOK 
        private readonly bookRepository: Repository<Book> // TypeORM utiliza essa classe Repository 
    ) { }   // para fornecer méotodos prontos pas acessar e manipular dados da entidade book


    async findAll() {          // Retornar os registros da array books
        return this.bookRepository.find()
    }

    async findOne(id: number) {        //Passa o parametro para a busca
        const book = await this.bookRepository.findOne({ // passa objeto de opções
            where: { id },
        })
        if (!book) {
            throw new NotFoundException(`Book ID ${id} not found.`);
        }
        return book; // Retorna diretamente o livro encontrado
    }

    async create(createBookDTO: CreateBookDTO) { // Adiciona o tipo de retorno 
        const book = this.bookRepository.create(createBookDTO)// Usa o método create do repositório BookRepository para criar uma instânmcia da netidade book
        return this.bookRepository.save(book) // Salva a entidade 'book' recem criada 
    }   // no banco de dados utilizando o método 'save' do repositório bookRepository

    async update(id: number, updateBookDTO: UpdateBookDTO) { //verifica se tem o curso que deseja atualizar
        const book = await this.bookRepository.preload({ // faz a busca e cria o objeto
            ...updateBookDTO,  // Descontrução do parametro updateBookDTO
            id,
        })
        if (!book) {
            throw new NotFoundException(`Book ID ${id} not found.`);
        }
        return this.bookRepository.save(book)
    }

    async remove(id: number) {
        const book = await this.bookRepository.findOne({
            where: { id },
        })
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return this.bookRepository.remove(book)
    }
}
