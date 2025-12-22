import express from "express";  
// const express = require("express");
const app = express();



// const dotenv = require("dotenv");
import dotenv from "dotenv";
import connectDB from "./db/Database.js";

dotenv.config();  
connectDB();


const PORT = process.env.PORT || 8000;




app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});