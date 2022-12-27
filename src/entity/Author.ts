import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book2 } from "./Book2";
import { Name } from "./Name";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Name)
    name: Name;

    @OneToMany(() => Book2, book => book.author)
    books: Book2[];

}