import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../entities/user";
import jwt from "jsonwebtoken";
import axios from "axios";
import { middleware } from "./middleware";
import { RequestAuth } from "../types";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/signUp", async (req, res) => {
  try {
    const data = await axios.get("https://randomuser.me/api/");
    const imgURL = data.data.results["0"].picture.thumbnail;
    const { firstName, lastName, email, password } = req.body;
    if (password.length > 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters " });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      firstName,
      lastName,
      imgURL,
      email,
      password: hashPassword,
    });

    await user.save();
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.json({ userInfo: user, token });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ message: "wrong password" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/me", middleware, async (req: RequestAuth, res) => {
  const user = req.user;
  res.json({ user });
});

export default router;
