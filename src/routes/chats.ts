import { Router } from "express";
import { Chat } from "../entities/chat";
import { Message } from "../entities/message";
import { User } from "../entities/user";
import { RequestAuth } from "../types";
import { middleware } from "./middleware";

const router = Router();

router.get("/", middleware, async (req, res) => {
  try {
    const chats = await Chat.find();
    if (!chats) {
      return res.status(400).send({ message: "no chat found" });
    }
    res.status(200).json({ data: chats });
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.post("/message", middleware, async (req: RequestAuth, res) => {
  try {
    const user = req.user;
    const { body, chatId } = req.body;
    const chat = await Chat.findOne({ where: { id: chatId } });
    if (!chat) {
      return res.status(400).send({ message: "no chat found" });
    }

    const message = Message.create({
      body,
      chat,
      user: req.user,
    });
  } catch (error) {}
});

export default router;
