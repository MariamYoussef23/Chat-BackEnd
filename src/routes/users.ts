import { Router } from "express";
import bcrypt from "bcryptjs";
import { User } from "../entities/user";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastName, email, password } = req.body;
    if (password.length > 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters " });
    }
  } catch (error) {
    res.status(500).json({ message: error });
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

    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
