import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateDto, UpdateDto } from "./dtos";

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/new-book')
  create(@Body() createBook: CreateDto) {
    return this.bookService.create(createBook);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try{
      return this.bookService.findOne(+id);
    }
    catch (e){
      return e;
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDto: UpdateDto) {
    try{
      return this.bookService.update(id, updateDto);
    }
    catch (e){
      return e;
    }
  }

  @Delete(':name')
  remove(@Param('id') id: number) {
    try{
      return this.bookService.remove(id);
    }
    catch (e){
      return e;
    }
  }
}
