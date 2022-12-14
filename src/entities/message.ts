import { Column, Entity, ManyToOne } from "typeorm";
import { Chat } from "./chat";
import { MainEntity } from "./main";
import { User } from "./user";

@Entity()
export class Message extends MainEntity {
  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.messages, { nullable: false })
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages, { nullable: false })
  chat: Chat;
}
