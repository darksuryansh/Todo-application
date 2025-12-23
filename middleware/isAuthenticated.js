// middle ware use for authentication and authorization
// like only the login user can acces rest apis

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const isAuthenticated =  async (req, res, next) => {
    try {
        const token=req.cookies.token 
        if (!token){
            return res.status(401).json({
                success:false,
                message:"User is not authenticated, Login first"
            })
        }
        const decode = await jwt.verify(token, process.env.SCRET_KEY);
        if (!decode){
            return res.status(401).json({
                success:false,
                message:"Invalid token, authentication failed"
            })
        }
        req.id = decode.userId; 
        
        next(); // next function like call create todo

        
    } catch (error) {
        console.log(error);
        
        
    }


}


// also can build access token and refresh token middleware 




