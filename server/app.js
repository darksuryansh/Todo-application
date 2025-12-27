import express from "express";  
import dotenv from "dotenv";
import connectDB from "./db/Database.js";
import userRoutes from "./routes/user.js";
import todoRouters from "./routes/todo.js";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors";
import {Redis} from "ioredis";
import axios from "axios";


dotenv.config();  
connectDB();

const app = express();

const RedisClient = new Redis();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.get("/alltodos", async(req,res)=>{
    try {

        const cachedData = await RedisClient.get("todos");
  

        if (cachedData!==null){
            return res.json(JSON.parse(cachedData));
        }
        else{
            const {data}= await axios("http://localhost:3000/api/todo/todos");
            await RedisClient.set("todos", JSON.stringify(data) );
            return res.json(data);

        }
      
        
    } catch (error) {
        console.log(error);
        
        
    }

} );


app.use("/api/users", userRoutes);
app.use("/api/todo", todoRouters);




const PORT = process.env.PORT ;




app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});