import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {PhoneEager} from "./PhoneEager";

@Entity()
export class UserEager {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(() => PhoneEager, phone => phone.user, {
        cascade: true,
        eager: true
    })
    phones: PhoneEager[];

}