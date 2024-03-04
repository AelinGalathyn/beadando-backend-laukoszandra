import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class Book{
  @IsNumber()
  id: number

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  author: string

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  published: number
}

export class CreateDto{
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  author: string

  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  published: number
}

export class UpdateDto extends PartialType(Book) {}