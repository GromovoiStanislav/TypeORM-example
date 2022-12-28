import "reflect-metadata";
import {DataSource} from "typeorm";
import {UserEager} from "./entity/UserEager";
import {PhoneEager} from "./entity/PhoneEager";


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

    // Eager
    const user = new UserEager();
    user.firstName = "John";
    user.lastName = "Doe";
    user.age = 26;

    const phone = new PhoneEager();
    phone.phoneNumber = 12345678;

    user.phones = [phone];

    const userRepository = connection.getRepository(UserEager);
    await userRepository.save(user);

    const users = await userRepository.find();

    console.log("Loaded users: ", users);

    users.forEach(user => {
        console.log("Phones: ", user.phones);
    });


}).catch(error => console.log(error));