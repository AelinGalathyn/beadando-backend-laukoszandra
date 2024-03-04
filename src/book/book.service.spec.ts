import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { NotFoundException } from "@nestjs/common";

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(service.findAll()).toEqual([]);
  });

  it("should return a single book", () => {
    service.create({name: 'The Giver', author: 'Lois Lowry', published: 1993});
    expect(service.findAll()).toEqual([{name: 'The Giver',id: expect.any(Number), author: 'Lois Lowry', published: 1993}]);
  });

  it("should return two books", () => {
    service.create({ name: 'City of Bones', author: 'Cassandra Clare', published: 2007 });
    service.create({ name: 'Les Misérables', author: 'Victor Hugo', published: 1862 });
    expect(service.findAll()).toEqual([{ name: 'City of Bones',id: expect.any(Number), author: 'Cassandra Clare', published: 2007 }, { name: 'Les Misérables',id: expect.any(Number), author: 'Victor Hugo', published: 1862 }]);
  });

  it("should find the single book", () => {
    const book1 = service.create({ name: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', published: 1997 });
    const book = service.findOne(book1.id);
    expect(book).toEqual(book1);
  });

  it("should not find the Maze Runner", () => {
    expect(() => service.findOne(1)).toThrow(NotFoundException);
  });

  it("should return the updated book", () => {
    const b = service.create({ name: 'The Maze Runner', author: 'James Dashner', published: 2008 });
    const book = service.update(b.id, {published: 2009});
    expect(book).toEqual({name: 'The Maze Runner', id: expect.any(Number), author: 'James Dashner', published: 2009});
  });

  it("should not find the book to update", () => {
    expect(() => service.update(1, {author: 'Jane Austen'})).toThrow(NotFoundException);
  });

  it("should remove the correct book from the list", () => {
    const b = service.create({ name: 'City of Bones', author: 'Cassandra Clare', published: 2007 });
    service.create({ name: 'Les Misérables', author: 'Victor Hugo', published: 1862 });
    service.remove(b.id);
    expect(service.findAll()).toEqual([{ name: 'Les Misérables', id: expect.any(Number), author: 'Victor Hugo', published: 1862 }]);
  });

  it("should not find the book to remove", () => {
    expect(() => service.remove(1)).toThrow(NotFoundException);
  });
});
