import {Request} from "express"
export interface RequestAuth extends Request {
    user?: UserType
}

export interface messageType{
    id:number,
    body:string,
    createdAt: Date,
    updatedAt: Date,
    user:UserType,
    chat:ChatType


}
export interface ChatType{
    id:number,
    chatName:string,
    messages:messageType[]
}

export interface UserType {
    id: number 
    firstName: string 
    lastName: string 
    email: string 
    password: string
    createdAt: Date
    updatedAt: Date,
    imgURL?:string

}