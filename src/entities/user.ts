import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Chat } from "./chat";
import { MainEntity } from "./main";
import { Message } from "./message";

@Entity()
export class User extends MainEntity{
  
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

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];
}
