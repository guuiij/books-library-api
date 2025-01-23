import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Book } from "./books.entity"
import { Tag } from "./tags.entity"

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @OneToMany(() => Book, book => book.authors )
    books: Book[]

    @ManyToMany(() => Tag, tag => tag.authur)
    tags: Tag[]

    //bio: string
    //birthday: Date

}