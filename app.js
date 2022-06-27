import express, { response } from "express";
import "dotenv/config.js";
import db from "./src/models/index.js";//database connection
import account from "./src/route/router.js";//registration and login routes
import verifys from "./src/middleware/verify.js";//token checking in header 
import cookieParser from "cookie-parser";
import http from 'http'
import {Server} from 'socket.io'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io=new Server(server)
app.use(express.json());
app.use(cookieParser())
app.use("/api",account);
app.set('view engine','ejs')
app.set('views','./src/views')

// app.get("/api/loged", verifys, (req, res) => {
//   res.send("success");
// });
app.get('/',verifys, (req, res) => {
  res.render(__dirname + '/src/views/index.ejs');
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  console.log('a user connected'+socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});  
app.get("/chat/home",(req, res) => {
  res.render('login')
  
});
   app.get("/chat/registration",(req, res) => {
  res.render('registration')

 });

server.listen(process.env.PORT,  async() => {
   await db.sequelize.sync();
  console.log("listening");
});
