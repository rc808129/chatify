import express from 'express'
import dotenv from "dotenv"
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from "path"
import cors from "cors";
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express()

const __dirname = path.resolve() // this point backend subfolder


console.log(__dirname, "rajchaurisya;s")  

app.use(cors()); 

app.use(express.json())

app.get("/hello", (req, res)=> {
  res.send("message this aisklvgs")
})

console.log(process.env.PORT)
const PORT = process.env.PORT || 3000

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)



if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
// express frontend ki build files browser ko serve kar sake
  // app.use ak middleware lagaya fir express.static yah middleware method haiiska kam is path par jo folder hai use uski file ko browser ko dena 
 
  app.get("*", (_, res)=> {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

app.listen(PORT, ()=>{
   console.log("server is running on port:" + PORT)
   connectDB()
  })