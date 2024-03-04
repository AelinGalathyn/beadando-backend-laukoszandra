import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { NotFoundException } from "@nestjs/common";

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(   {
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should return the new book", () => {
    const book = controller.create({name: 'Ender\'s Game', author: 'Orson Scott Card', published: 1985});
    expect(book).toEqual({name: 'Ender\'s Game', id: expect.any(Number), author: 'Orson Scott Card', published: 1985});
  });

  it("should return all books in the list", () => {
    controller.create({name: 'The Hobbit', author: 'J.R.R. Tolkien', published: 1937});
    controller.create({name: '1984', author: 'George Orwell', published: 1949});
    controller.create({name: 'To Kill a Mockingbird', author: 'Harper Lee', published: 1960});
    controller.create({name: 'Pride and Prejudice', author: 'Jane Austen', published: 1813});
    controller.create({name: 'The Catcher in the Rye', author: 'J.D. Salinger', published: 1951});
    expect(controller.findAll()).toEqual([{"name": "The Hobbit",
          "author": "J.R.R. Tolkien", "id": expect.any(Number),
          "published": 1937}, {"name": "1984",
          "author": "George Orwell","id": expect.any(Number),
          "published": 1949}, {"name": "To Kill a Mockingbird",
          "author": "Harper Lee","id": expect.any(Number),
          "published": 1960}, {"name": "Pride and Prejudice",
          "author": "Jane Austen","id": expect.any(Number),
          "published": 1813}, {"name": "The Catcher in the Rye",
          "author": "J.D. Salinger","id": expect.any(Number),
          "published": 1951 }])
  });

  it("should return the single book returned by the service.findOne()", () => {
    const book1 = controller.create({name: 'The Hobbit', author: 'J.R.R. Tolkien', published: 1937});
    const book2 = controller.create({name: '1984', author: 'George Orwell', published: 1949});
    expect(controller.findOne(book1.id)).toEqual({name: 'The Hobbit', "id": expect.any(Number),author: 'J.R.R.' +
        ' Tolkien', published: 1937})
  });

  it("should return the updated book", () => {
    const book1 = controller.create({name: 'The Hobbit', author: 'J.R.R. Tolkien', published: 1937});
    const book2 = controller.update(book1.id, {name: 'Lord of the Rings', published: 1954});
    expect(book2).toEqual({name: 'Lord of the Rings',"id": expect.any(Number), author: 'J.R.R. Tolkien', published: 1954});
  });

  it("should return the updated list without the deleted book", () => {
    const book1 = controller.create({name: 'The Hobbit', author: 'J.R.R. Tolkien', published: 1937});
    const book2 = controller.create({name: '1984', author: 'George Orwell', published: 1949});
    const book3 = controller.create({name: 'To Kill a Mockingbird', author: 'Harper Lee', published: 1960});
    const book4 = controller.create({name: 'Pride and Prejudice', author: 'Jane Austen', published: 1813});
    const book5 = controller.create({name: 'The Catcher in the Rye', author: 'J.D. Salinger', published: 1951});
    expect(controller.remove(book3.id)).toEqual([{"name": "The Hobbit",
      "author": "J.R.R. Tolkien", "id": expect.any(Number),
      "published": 1937}, {"name": "1984",
      "author": "George Orwell","id": expect.any(Number),
      "published": 1949}, {"name": "Pride and Prejudice",
      "author": "Jane Austen","id": expect.any(Number),
      "published": 1813}, {"name": "The Catcher in the Rye",
      "author": "J.D. Salinger","id": expect.any(Number),
      "published": 1951 }])
  });
});
