import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { PhoneLazy } from "./PhoneLazy";

@Entity()
export class UserLazy {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToMany(() => PhoneLazy, phone => phone.user, {
        cascade: true,
        lazy: true
    })
    phones: Promise<PhoneLazy[]>;
}