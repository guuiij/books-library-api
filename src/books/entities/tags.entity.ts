import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./books.entity";


@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Book, book => book.tags)
    books: Book[]  // Array da entidade Books

}