import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Phone2 extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phoneNumber: number;
}