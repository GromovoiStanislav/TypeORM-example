import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import {UserEager} from "./UserEager";


@Entity()
export class PhoneEager {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phoneNumber: number;

    @ManyToOne(() => UserEager, user => user.phones)
    user: UserEager;
}