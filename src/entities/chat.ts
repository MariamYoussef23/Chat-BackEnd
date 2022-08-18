import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MainEntity } from "./main";
import { Message } from "./message";
import { User } from "./user";

@Entity()
export class Chat extends MainEntity {
  
  @Column()
  chatName: string;

  @Column({ nullable: true })
  ChatImgURL: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  users: User[];
}
