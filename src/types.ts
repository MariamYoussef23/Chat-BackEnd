import {Request} from "express"
import { User } from "./entities/user";
export interface RequestAuth extends Request {
    user?: User 
}
<<<<<<< HEAD

export interface User {
    id: number 
    firstName: string 
    lastName: string 
    email: string 
    password: string 
    imgURL?: string
    createdAt: Date
    updatedAt: Date
}
=======
>>>>>>> main
