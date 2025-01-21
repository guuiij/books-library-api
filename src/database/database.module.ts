import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/books.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {

    type: 'postgres',        // Tipo de banco de dados
    host: 'localhost',       // Nosso container em execução
    port: 5432,              // Por que vamos nos comunicar
    username:'postgres',     // Usuário padrão quando não é definido
    password: 'docker',      // Senha definida como docker
    database: 'libraryapi',  // Mesmo nome daqui -->  POSTGRES_DB=libraryapi 
    entities: [Book],            // Define quais entidades o TypeORM vai cria estrurua de BD 
    synchronize: true,

}

@Module({
    imports: 
    [TypeOrmModule.forRootAsync({   //PAra conexão em banco de dados
        useFactory: async () => {  // Retorna propriedade da variavei criado a cima
            return {
                ...dataSourceOptions
            }
        }
    })]
})
export class DatabaseModule {}
