import express, { json, urlencoded } from 'express'
import cors from 'cors';
import morgan from 'morgan'
import helmet from 'helmet'
import { config } from 'dotenv';
import { AppDataSource } from './data-source';
import usersRouter from './routes/users'
import chatsRouter from './routes/chats'

const app = express()

config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));


app.use('/users', usersRouter)
app.use('/chats', chatsRouter)

app.listen(process.env.PORT, async()=> {
    try {
        await AppDataSource.initialize()
        console.log('connected to database')
    }catch(error) {
        throw new Error (`${(error as Error).message}`)
    }
})
