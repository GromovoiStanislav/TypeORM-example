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

    // Data Mapper
    const user = new User();
    user.firstName = "John";
    user.lastName = "Doe";

    const userRepository = connection.getRepository(User);
    await userRepository.save(user);

    const user1 = await userRepository.findOne({where: {firstName: "John", lastName: "Doe"}});
    console.log("User: ", user1);

    const users = await userRepository.find();
    console.log("Users: ", users);


    // Active Record
    const phone = new Phone();
    phone.phoneNumber = 12345678;
    await phone.save();

    const phone1 = await Phone2.findOne({where: {phoneNumber: 12345678}});
    console.log("Phone: ", phone1);

    const phones = await Phone.find()
    console.log("Phones: ", phones);

}).catch(error => console.log(error));