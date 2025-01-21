import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('books')   //Marcar uma classe como uma entidade que será mapeada para uma tabela no banco de dados.
export class Book {
    @PrimaryGeneratedColumn()   // Define chave primária de uma tabela
    id: number
    
    @Column()       // Suado para mapear as demais colunas da tabela
    title: string
    
    @Column()
    genre: string
    
    @Column('json', {nullable: true}) // Armazenaa um json e poode ter coluna nullo
    tags?: string[]

}