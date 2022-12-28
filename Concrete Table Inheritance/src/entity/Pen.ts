import {Entity, Column} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Pen extends Product {
    @Column()
    color: string;
}