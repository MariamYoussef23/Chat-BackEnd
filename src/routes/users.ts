import { Router } from "express";
import { User } from "../entities/user";
import bcrypt from "bcryptjs";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) res.send({ data: users });
    res.send({ data: users });
  } catch (error) {
    res.status(500).send({ massage: error });
  }
});

router.post("/signUp", async (req, res) => {
  try {
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
      email,
      password: hashPassword,
    });
    await user.save();
    res.send({ data: user });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
