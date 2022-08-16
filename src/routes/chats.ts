import { Router } from "express";
import { Chat } from "../entities/chat";
import { Message } from "../entities/message";
import { User } from "../entities/user";
import { RequestAuth, UserType } from "../types";
import { middleware } from "./middleware";
const router = Router();

router.post("/message", middleware, async (req: RequestAuth, res) => {
  try {
    const user = req.user
    const { body, chatId} = req.body;
    const chat = await Chat.findOne({ where: { id: chatId } });
    if (!chat) {
      return res.status(400).send({ message: "no chat found" });
    }
    const message = Message.create({
      body,
      chat,
      user:req.user
    });
    
  } catch (error) {

  }
});

export default router;

//when a user is logged in
//all chats (fahad)
// all messages within a chat (mariam)
//create a new message  (fahad)
//create a new chat (mariam)
