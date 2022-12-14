import express, { json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "dotenv";
import { AppDataSource } from "./data-source";
import usersRouter from "./routes/users";
import chatsRouter from "./routes/chats";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
server.listen(1212);


const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// io.on("connection", (socket) => {
//   console.log("connected");
//   socket.on("new message", (msg) => {
//     console.log(msg);
//     io.emit("new message", msg);
//   });
// });

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("room", (userEmail) => {
    socket.join(userEmail);
    console.log(userEmail)
  });
  socket.on("message", (msg) => {
    console.log(msg);
    msg.userEmails.map((userEmail: string) => {
      io.to(userEmail).emit("new message", msg.body);
    });
    
  });
});

config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/chats", chatsRouter);

app.listen(process.env.PORT, async () => {
  try {
    await AppDataSource.initialize();
    console.log("connected to database");
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
});
