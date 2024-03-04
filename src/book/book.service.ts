import { Injectable, NotFoundException } from "@nestjs/common";
import { Book, CreateDto, UpdateDto } from "./dtos";

@Injectable()
export class BookService {
  create(createBook: CreateDto) {
    const book: Book = {
      id: Math.random()*100,
      ...createBook};
    this.books.push(book);
    return book;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find(book => book.id === id);
    if(book === undefined){
      throw new NotFoundException();
    }
    else {
      return book;
    }
  }

  update(id: number, updateDto: UpdateDto) {
    const book = this.books.find(book => book.id === id);
    if(book !== undefined){
      Object.assign(book, updateDto);
      return book;
    }
    else{
      throw new NotFoundException();
    }
  }

  remove(id: number) {
    const book = this.books.findIndex(book => book.id === id);
    if(book !== -1) {
      this.books.splice(book, 1);
      return this.books;
    }
    else {
      throw new NotFoundException();
    }
  }

  private readonly books: Book[]=[];
}
