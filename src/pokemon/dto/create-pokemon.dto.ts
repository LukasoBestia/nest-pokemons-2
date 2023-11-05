import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    //isint,ispositive,min1
    @IsNumber()
    @IsPositive()
    @Min(1)
    no:number;
    //isstring,minlenght 1
    @IsString()
    @MinLength(1)
    name: string
}
