import "reflect-metadata";
import {DataSource} from "typeorm";
import {User} from "./entity/User";
import {Phone} from "./entity/Phone";



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

    // INSERT USER
    await connection.createQueryBuilder()
        .insert()
        .into(User)
        .values([
            { firstName: "John", lastName: "Doe", age: 26 }
        ])
        .execute();


    // SELECT SINGLE USER
    const user = await connection.createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.id = :id", { id: 2 })
        .getOne();

    console.log("User from DB: ", user);


    // INSERT PHONE
    await connection.createQueryBuilder()
        .insert()
        .into(Phone)
        .values([
            { phoneNumber: 12345678 }
        ])
        .execute();


    // INSERT RELATION PHONE AND USER
    await connection.createQueryBuilder()
        .relation(User, "phones")
        .of(user)
        .add({ id: 1});//id-phone


    // SELECT USER LEFT JOIN PHONE
    const users = await connection.createQueryBuilder()
        .select("user")
        .from(User, "user")
        .leftJoinAndSelect("user.phones", "phones")
        .getMany();

    console.log("Users from DB: ", users);
	
	users.forEach(user => {
        console.log("User: ", user);
    });


}).catch(error => console.log(error));