import { Router } from "express";
import { Chat } from "../entities/chat";
import { Message } from "../entities/message";
import { RequestAuth } from "../types";
import { middleware } from "./middleware";
const router = Router();

router.post("/message", middleware, async (req: RequestAuth, res) => {
  try {
    const { body, chatId } = req.body;
    const chat = await Chat.findOne({ where: { id: chatId } });
    if (!chat) {
      return res.status(400).send({ message: "no message found" });
    }

    const message = Message.create({
      messageBody: body,
      chat,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;

