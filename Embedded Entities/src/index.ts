import "reflect-metadata";
import { DataSource} from "typeorm";
import { Book } from "./entity/Book";
import {Audit} from "./entity/Audit";
import {Name} from "./entity/Name";
import {Author} from "./entity/Author";

const connectDB = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'typeorm',
    entities: ['src/entity/*.ts'],
    synchronize: true,
});

connectDB.initialize().then(async connection => {

    const audit = new Audit();
    audit.created_by = "user1";
    audit.created_on = new Date();
    audit.updated_by = "user2";
    audit.updated_on = new Date();

    const name = new Name();
    name.first = "Robert";
    name.last = "Martin";

    const author = new Author();
    author.name = name;

    const book = new Book();
    book.title = "Clean Code";
    book.author = author;
    book.price = 33;
    book.audit = audit;


    const bookRepository = connection.getRepository(Book);
    await bookRepository.save(book);

;

}).catch(error => console.log(error));