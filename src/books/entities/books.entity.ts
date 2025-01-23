import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags.entity"

@Entity('books')   //Marcar uma classe como uma entidade que será mapeada para uma tabela no banco de dados.
export class Book {
    @PrimaryGeneratedColumn()   // Define chave primária de uma tabela
    id: number
    
    @Column()       // Suado para mapear as demais colunas da tabela
    title: string
    
    @Column()
    genre: string
    
               // Usado na entidade principal, que definie proprietarios
    @ManyToMany(() => Tag, tag => tag.books, { 
        cascade: true, 
        eager: true }) // Tag nosso alvo ( relacionado ) , e tag é o inverse side  tem propriedade books
    @JoinTable()
    tags: Tag[]           // deixa de ser array de string e é array de tag

}