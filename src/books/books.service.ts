import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/books.entity';
import { UpdateBookDTO } from 'src/books/dto/upadate-book.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDTO } from './dto/create-book.dto';
import { Tag } from './entities/tags.entity';
import { Author } from './entities/authors.entity';

@Injectable()       // Marca a classe BooksService como serivcel injetavel
export class BooksService {
    constructor(
        @InjectRepository(Book) // Injetar o repositório correspondendo a entidade BOOK 
        private readonly bookRepository: Repository<Book>, // Define uma propriedade privada chamada bookRepository que é do tipo Repository<Book> e será usada para interagir com a entidade Book no banco de dados.
        @InjectRepository(Tag) // Injetar o repositório correspondendo a entidade TAG 
        private readonly tagRepository: Repository<Tag>,
        @InjectRepository(Author) // Injetar o repositório correspondendo a entidade Author 
        private readonly authorRepository: Repository<Author> // permite que você utilize o 
        // repositório da entidade dentro da classe onde ele é injetado.
    ) { }   // para fornecer méotodos prontos pas acessar e manipular dados da entidade book


    async findAll() {          // Retornar os registros da array books
        return this.bookRepository.find()
    }

    async findOne(id: number) {        //Passa o parametro para a busca
        const book = await this.bookRepository.findOne({ // passa objeto de opções
            where: { id }
        })
        if (!book) {
            throw new NotFoundException(`Book ID ${id} not found.`);
        }
        return book; // Retorna diretamente o livro encontrado
    }

    async create(createBookDTO: CreateBookDTO) { // Adiciona o tipo de retorno 
        const author = await this.preloadAuthorByName(createBookDTO.author)

        const tags = await Promise.all(    // efetua operação assyncrona pra cada elemento que passar aqui
            createBookDTO.tags.map(name => this.preloadTagByName(name)) // cada name que pegar usa esse méotod
        )
        const book = this.bookRepository.create({// Usa o método create do repositório BookRepository para criar uma instânmcia da netidade book
            ...createBookDTO, // criação do curso considera os dados do dto e as tags sobrescritas
            tags,
            author
           
        })
        return this.bookRepository.save(book) // Salva a entidade 'book' recem criada 
    }   // no banco de dados utilizando o método 'save' do repositório bookRepository

    async update(id: number, updateBookDTO: UpdateBookDTO) { //verifica se tem o curso que deseja atualizar
        const author = await this.preloadAuthorByName(updateBookDTO.author)
        const tags = updateBookDTO.tags &&
            await Promise.all(
                updateBookDTO.tags.map(name => this.preloadTagByName(name))
            )
        const book = await this.bookRepository.preload({    // faz a busca e cria o objeto
            ...updateBookDTO,           // Descontrução do parametro updateBookDTO
            id,
            tags,
            author
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

    private async preloadTagByName(name: string): Promise<Tag> { // Promisse que retorna cada tag
        const tag = await this.tagRepository.findOne({ where: { name } }) // instancia usada pra vincular o registro de book que foi criada
        if (tag) {
            return tag
        }
        return this.tagRepository.create({ name })
    }

    private async preloadAuthorByName(name: string): Promise<Author> {
        const author = await this.authorRepository.findOne({ where: { name } })
        if(author){
            return author
        }
        return this.authorRepository.create({ name })
    }


}
