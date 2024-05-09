// LogOut.js

import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MdLogout } from "react-icons/md";
import { updateOffline } from '../utils/APIRoutes'

export default function LogOut() {

    const navigate = useNavigate();

    const handleClick = async () =>{
        try {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
           await axios.post(`${updateOffline}/${user._id}`,{
            isOnline:false
           })
           user.isOnline = false;
            // Xóa dữ liệu người dùng khỏi localStorage
            localStorage.clear();
            // Chuyển hướng người dùng đến trang đăng nhập
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    return (
        <button className='flex justify-center items-center p-1 cursor-pointer bg-indigo-100 rounded-md' onClick={handleClick}>
             <MdLogout style={{fontSize:'25px'}}/>
        </button>
  )
}
