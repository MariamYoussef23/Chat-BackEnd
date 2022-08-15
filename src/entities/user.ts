import { Column, Entity } from "typeorm";
import { MainEntity } from "./main";

@Entity()
export class User extends MainEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  imgURL: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}


