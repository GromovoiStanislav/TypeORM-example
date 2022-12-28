import "reflect-metadata";
import {DataSource} from "typeorm";
import {User} from "./entity/UserEager";
import {Phone} from "./entity/PhoneEager";


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

    // Eager relations
    const user = new User();
    user.firstName = "John";
    user.lastName = "Doe";
    user.age = 26;

    const phone = new Phone();
    phone.phoneNumber = 12345678;

    user.phones = [phone];

    const userRepository = connection.getRepository(User);
    await userRepository.save(user);

    const users = await userRepository.find();

    console.log("Loaded users: ", users);

    users.forEach(user => {
        console.log("Phones: ", user.phones);
    });


}).catch(error => console.log(error));