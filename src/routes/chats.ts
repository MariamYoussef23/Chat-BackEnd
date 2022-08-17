import { Router } from "express";
import { In } from "typeorm";
import { Chat } from "../entities/chat";
import { Message } from "../entities/message";
import { User } from "../entities/user";
import { RequestAuth } from "../types";
import { middleware } from "./middleware";

const router = Router();

//get all chats
router.get("/", middleware, async (req: RequestAuth, res) => {
  try {
    const user = req.user!;

    const { chats } = (await User.findOne({
      where: { id: user.id },
      relations: { chats: { users: true } },
    }))!;

    res.status(200).json({ data: chats });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//get all messages within a chat
router.get("/:id/messages", middleware, async (req: RequestAuth, res) => {
  try {
    const id = +req.params.id;

    const { messages } = (await Chat.findOne({
      where: { id },
      relations: { messages: { user: true } },
    }))!;

    // const messages = await Message.find({
    //   where: { chat: { id },
    //   relations: {user: true} }
    // });

    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//create a new message
router.post("/:id/message", middleware, async (req: RequestAuth, res) => {
  try {
    const user = req.user!;
    const chatId = +req.params.id
    const {body} = req.body;
    const chat = await Chat.findOne({ where: { id: chatId } });
    if (!chat) {
      return res.status(400).send({ message: "no chat found" });
    }

    const message = Message.create({
      body,
      chat,
      user,
    });

    await message.save();
    res.json({ message });
  } catch (error) {
    console.log(error);
  }
});

//create a new chat
router.post("/chat", middleware, async (req: RequestAuth, res) => {
  try {
    const user = req.user!;
    const { chatName, userIds } = req.body;

    let users = await User.find({ where: { id: In(userIds || []) } });
    users.push(user);

    const chat = Chat.create({
      chatName,
      users,
    });

    await chat.save();

    res.json({ chat });
  } catch (error) {
    console.log(error);
  }
});




export default router;
