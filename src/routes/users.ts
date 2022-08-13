import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../entities/user";
import jwt from "jsonwebtoken";
import axios from "axios";

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
    const imgUrl = data.data.results["0"].picture.thumbnail;
    const { firstName, lastName, email, password } = req.body;
    if (password.length > 8) {
      return res
        .status(400)
        .send({ message: "Password must be at least 8 characters " });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      firstName,
      lastName,
      imgUrl,
      email,
      password: hashPassword,
    });
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    await user.save();
    res.send({ data: user, token });
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

    res.json({ data: token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/me", async (req, res) => {
  try {
    const { token } = req.body;
    const { email } = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };
    const user = await User.findOne({ where: { email: email } });
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
