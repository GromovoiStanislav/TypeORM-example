import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User2 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}