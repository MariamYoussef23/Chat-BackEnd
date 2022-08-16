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
    imgURL?: string
    createdAt: Date
    updatedAt: Date
}