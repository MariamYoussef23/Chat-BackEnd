import {Request} from "express"
export interface RequestAuth extends Request {
    user?: User
}

export interface User {
    id: number 
    firstName: string 
    lastName: string 
    email: string 
    password: string 
    imgURL: string | null
    createdAt: Date
    updatedAt: Date
}