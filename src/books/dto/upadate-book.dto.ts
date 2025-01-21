import { CreateBookDTO } from "./create-book.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdateBookDTO extends PartialType(CreateBookDTO){


    // Na classe Update Dto as propriedades deverão ser opicionais
    //readonly title?: string
   // readonly genre?: string
   // readonly tags?: string[]

}