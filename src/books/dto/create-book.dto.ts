import { IsArray, IsString } from "class-validator"

export class CreateBookDTO {

    @IsString()
    readonly title: string

    @IsString()
    readonly genre: string

    @IsArray()
    @IsString({each: true})
    readonly tags: string[]

}