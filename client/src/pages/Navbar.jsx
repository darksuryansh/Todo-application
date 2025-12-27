import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = ()=>{
    const navigate= useNavigate();
    const logoutHandler = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/users/logout");
        if (res.data.success){
            toast.success(res.data.message);
            navigate('/login');
        }
        
    } catch (error) {
        toast.error(error.response.data.message || "Something went wrong");
        
    }
  }

    return (
        <div className='bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
            <div className='flex items-center justify-between p-2'>
                <h1 className='text-white font-bold text-2xl'>TodoApp</h1>
                <Button onClick={logoutHandler}>Logout</Button>

            </div>

        </div>
    )

}

export default Navbar;