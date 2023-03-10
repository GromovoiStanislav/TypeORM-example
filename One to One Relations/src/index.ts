import "reflect-metadata";
import { DataSource} from "typeorm";
import { Profile } from "./entity/Profile";
import {User} from "./entity/User";


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
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;

  
	const profile = new Profile();
    profile.gender = "M";
    profile.photo = "http://photos.google.com/images/1.png";

    user.profile = profile;



    //await connection.manager.save(user)
    const userRepository = connection.getRepository(User);
    await userRepository.save(user);
    console.log("Saved a new user with id:"+user.id);




    console.log("Loading users from the database...");
    //const users = await userRepository.find({ relations: ["profile"] });
     const users = await userRepository
                     .createQueryBuilder("user")
                     .leftJoinAndSelect("user.profile", "profile")
                    .getMany();
    
     console.log("Loaded users: ", users);


    console.log("Loading profiles from the database...")
    const profileRepository = connection.getRepository(Profile);
    // //const profiles = await profileRepository.find({ relations: ["user"] });
    const profiles = await profileRepository
                     .createQueryBuilder("profile")
                     .leftJoinAndSelect("profile.user", "user")
                     .getMany();
    
    console.log("Loaded profiles: ", profiles);







}).catch(error => console.log(error));
