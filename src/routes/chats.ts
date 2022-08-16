import { Router } from "express";
import { Chat } from "../entities/chat";
import { Message } from "../entities/message";
import { User } from "../entities/user";
import { RequestAuth } from "../types";
import { middleware } from "./middleware";
const router = Router();

//create a new message 
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
      user
    });
    
    await message.save()
    res.json({ message });
  } catch (error) {
    console.log(error)
  }
});


//create a new chat 
router.post("/chat", middleware, async (req: RequestAuth, res) => {
  try{
      const user = req.user
      const {chatName, chatUsers } = req.body

      const users = [user, chatUsers]
      const chat = Chat.create({
        chatName,
        users
      })

      await chat.save()
    res.json({ chat });
  }catch(error){
    console.log(error)
  }
})


export default router;



