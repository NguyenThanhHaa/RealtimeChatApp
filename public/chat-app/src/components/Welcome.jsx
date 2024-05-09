import React from 'react'
import Cat from '../assets/hi.gif'


export default function Welcome({currentUser}){
    return(
        <div className='flex flex-col'>
        
        <div className='flex flex-col justify-center items-center text-white mt-11 '>
            <img src={Cat} alt='Robot gif' style={{height:'20rem',marginBottom:'20px'}} />
            <h1>Hello <span className='uppercase font-bold text-slate-900'>{currentUser.username}</span> nha!</h1>
            <h3>Bắt đầu cuộc trò chuyện thui!</h3>
       </div>

        </div>
        
      
    )
}


