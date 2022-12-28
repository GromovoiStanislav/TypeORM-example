import "reflect-metadata";
import { DataSource} from "typeorm";
import { Profile } from "./entity/Profile";
import {User} from "./entity/User";
import {Phone} from "./entity/Phone";
import {Community} from "./entity/Community";



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

connectDB
    .initialize()
    .then( async connection => {

    console.log("Inserting a new user into the database...");

    const user = new User();
    user.firstName = "John";
    user.lastName = "Doe";
    user.age = 26;

    const phone1 = new Phone();
    phone1.phoneNumber = 12345678;
    user.addPhone(phone1);

    const phone2 = new Phone();
    phone2.phoneNumber = 99889411;
    user.addPhone(phone2);


    const profile = new Profile();
    profile.gender = "M";
    profile.photo = "http://photos.google.com/images/2.png";

    user.profile = profile;


    const stackOverflow = new Community();
    stackOverflow.name = "StackOverflow";

    const github = new Community();
    github.name = "GitHub";

    user.addCommunity(stackOverflow);
    user.addCommunity(github);




    //await connection.manager.save(user)
    const userRepository = connection.getRepository(User);
    await userRepository.save(user);
    console.log("Saved a new user with id:"+user.id);




    console.log("Loading users from the database...");
    


    const users = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.profile", "profile")
        .leftJoinAndSelect("user.phones", "phones")
        .leftJoinAndSelect("user.communities", "communities")
        .getMany();

    console.log("Loaded users: ", users);

    users.forEach(user => {
        console.log("User: ", user);
        console.log("Phones: ", user.phones);
        console.log("Communities: ", user.communities);
    });




}).catch(error => console.log(error));
