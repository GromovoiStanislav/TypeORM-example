import "reflect-metadata";
import { DataSource} from "typeorm";
import { Book } from "./entity/Book";
import { Pen } from "./entity/Pen";

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

    const book = new Book();
    book.name = "Clean Code First Edition";
    book.title = "Clean Code";
    book.author = "Robert C. Martin";
    book.price = 120;

    const pen = new Pen();
    pen.name = "Blue pen";
    pen.color = "blue";
    pen.price = 2;

    const bookRepository = connection.getRepository(Book);
    await bookRepository.save(book);

    const penRepository = connection.getRepository(Pen);
    await penRepository.save(pen);

}).catch(error => console.log(error));