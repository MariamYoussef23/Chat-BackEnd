import {Request} from "express"
import { User } from "./entities/user";
export interface RequestAuth extends Request {
    user?: User
}
