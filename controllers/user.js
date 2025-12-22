// Simply to controll models make controllers 



// bcryptjs - password hashing (use to hash the password)

import { User } from '../models/user.js';
import bcrypt from 'bcrypt';


export const register = async (req,res)=>{
    try {
        const {fullname,email,password} = req.body;

        if (!fullname || !email || !password){  // or operstor to check any one field is missing 
            return res.status(403).json ({
                success:false,
                message:"All fields are required"
            })

        }
        // Find alredy registered user

        const user= await User.findOne(email);
        
        if(user){
            return res.status(403).json({
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
        
    }
}