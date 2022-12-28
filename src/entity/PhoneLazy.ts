import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserLazy } from "./UserLazy";


@Entity()
export class PhoneLazy {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phoneNumber: number;

    @ManyToOne(() => UserLazy, user => user.phones)
    user: UserLazy;
}