import { Router } from "express";
import { Chat } from "../entities/chat";
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

export default router;
