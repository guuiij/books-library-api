import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Book } from "./books.entity"
import { Tag } from "./tags.entity"

@Entity('authors')
export class Author {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @OneToMany(() => Book, book => book.author)
    books: Book[]


}