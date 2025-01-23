import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags.entity"
import { Author } from "./authors.entity"

@Entity('books')   //Marcar uma classe como uma entidade que será mapeada para a tabela "Book" no banco de dados.
export class Book {
    @PrimaryGeneratedColumn() @PrimaryGeneratedColumn() // Define a chave primária da tabela com geração automática de valores
    id: number

    @Column()       // Mapeia a coluna "title" ma tabela "book"
    title: string

    @Column()
    genre: string

    @ManyToMany(() => Tag, tag => tag.books, { //Relacionamento muitos-para-muitos
        cascade: true, // Todas as operações de persistência são aplicadas à entidade Tag
        eager: true    // faz com que a relação seja carregada automaticamente em todas as consultas 
    })
    @JoinTable()
    tags: Tag[]       // Define a propriedade tags como um array de objetos Tag

    @ManyToOne(() => Author, author => author.books)
    authors: Author[]// Define a propriedade author como um array de objetos Author


}