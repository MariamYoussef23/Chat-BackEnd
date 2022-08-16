import jwt from "jsonwebtoken";
import { User } from "../entities/user";
import { NextFunction, Request, Response } from "express";
import { RequestAuth } from "../types";

export const middleware = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;
  if (!token) {
    return res.json(404).send("No valid token was provided");
  }
  try {
    const { email } = jwt.verify(token as string, process.env.JWT_SECRET!) as {
      email: string;
    };
    if (!email) {
      return res.json(404).send("Invalid token");
    }
    const user = await User.findOne({ where: { email: email } });
    if(!user) {
        return res.json(404).send("user not found");
    }
    req.user = user
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
