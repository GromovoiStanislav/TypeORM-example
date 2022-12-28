import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Profile } from "./Profile";
import { Phone } from "./Phone";
import { Community } from "./Community";

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

    @OneToMany(() => Phone, phone => phone.user, {
        cascade: true
    })
    phones: Phone[];


    @ManyToMany(() => Community, community => community.users, {
        cascade: true
    })
    @JoinTable()
    communities: Community[];


    addPhone(phone: Phone) {
        if(this.phones == null) {
            this.phones = new Array<Phone>();
        }
        this.phones.push(phone);
    }

    addCommunity(community: Community) {
        if(this.communities == null) {
            this.communities = new Array<Community>();
        }
        this.communities.push(community);
    }

}
