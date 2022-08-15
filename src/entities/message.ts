import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Chat } from "./chat";
import { MainEntity } from "./main";
import { User } from "./user";

@Entity()
export class Message extends MainEntity {
  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
