import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { Profile } from "./Profile";



@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @OneToOne(() => Profile,  profile => profile.user, {
      cascade: true
    })
    @JoinColumn()
    profile: Profile;

}
