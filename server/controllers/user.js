// Simply to controll models make controllers 



// bcryptjs - password hashing (use to hash the password)

import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req,res)=>{
    try {
        const {fullname,email,password} = req.body;

        if (!fullname || !email || !password){  // or operstor to check any one field is missing 
            return res.status(400).json ({
                success:false,
                message:"All fields are required"
            })

        }
        // Find alredy registered user

        const user= await User.findOne({email});
        
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })

        }


        const hashedPassword = await bcrypt.hash(password,10); // 10 salting rounds



        // Create new user
        await User.create({
            fullname,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            success:true,
            message:"User registered successfully"
        });

    } catch (error) {
        console.log(error);    
        
    }
}


export const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {  // or operstor to check any one field is missing 
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })

        }

        const user= await User.findOne({email});
        
        if(!user){  // if user does not exist 
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })

        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400 ).json({
                success:false,
                message:"Invalid password"
            })
        }  

        const token = await jwt.sign({ userId: user._id }, process.env.SCRET_KEY, {
            expiresIn: "3d"
        });
        
        res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
        }).json({
            success:true,
            message: `Welcome back ${user.fullname}`
        });


        
    } catch (error) {

        console.log(error);
        
        
    }
}


export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","",  { maxAge: 0 }).json({
            success:true,
            message:"Logged out successfully"
        });
        
    } catch (error) {
        console.log(error);
        
    }
}

