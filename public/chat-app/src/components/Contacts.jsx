import React, { useState, useEffect,useRef } from "react";
import Logo from "../assets/logo.svg";
import LogOut from "./LogOut";
import Tooltip from '@mui/material/Tooltip';
import { FaCircle } from "react-icons/fa6";
import {io} from "socket.io-client"


export default function Contacts({ contacts, currentUser, changeChat }) {


  const [currentUserName, setCurrentUserName] = useState(undefined);

  const [currentOnline, setCurrentOnline] = useState(false);

  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  const [currentSelected, setCurrentSelected] = useState(undefined);

  const [searchKeyword, setSearchKeyword] = useState("");
  
  const socket = useRef();


  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
      setCurrentOnline(currentUser.isOnline);

    // Connect to Socket.IO server
    socket.current = io("http://localhost:3000");
    // Listen for 'isOnline' event from server
    socket.current.on("isOnline", ({ userId, isOnline }) => {
      // Update the online status of the user
      if (userId === currentUser._id) {
        setCurrentOnline(isOnline);
      }
    });

    return () => {
      // Disconnect Socket.IO when component unmounts
      if (socket.current) {
        socket.current.disconnect();
      }
    }
  }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    // console.log({index,contact});
  };

  //search user 
  const filteredContacts = contacts.filter((contact) => {
    // Check if contact._id exists before calling toLowerCase()
    if (contact._id) {
      return contact.username
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    }
    return false; // Exclude contacts without a name property
  });



  return (
    <>
      {currentUserImage && currentUserName && (
        <div
          className=" brands bg-gradient-to-r from-slate-600 to-slate-900"
          style={{
            display: "grid",
            gridTemplateRows: "13% 10% 62% 15%",
            overflow: "hidden",
          }}
        >
         
          <div className="flex items-center px-4 py-2  ">
            <Tooltip title="Đăng xuất">
              <div className='flex items-center'>
                  <LogOut/>
              </div>
            </Tooltip>

            <div className='flex items-center justify-center px-8'>
              <img src={Logo} alt="logo" className="h-10" />
              <h3 className="text-white uppercase mt-2" >StormyGram</h3>
            </div>
             
          </div>
          
          <div className='px-4 pb-10 items-center'>
            <input
                type="text"
                placeholder="Tìm kiếm bạn bè..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="border rounded-md mt-2 px-2 focus:outline-none py-2"
                style={{width:'99%'}}
              />
          </div>
        
          <div className="contacts flex flex-col items-center overflow-auto gap-3 mt-2">
            {filteredContacts.map((contact, index) => {
              return (
                <div
                  className={` 
                      rounded-md cursor-pointer
                      contact ${
                        index === currentSelected
                          ? "selected bg-gradient-to-r from-slate-400 to-slate-600"
                          : "bg-gradient-to-r from-slate-600 to-slate-800"
                      }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                  style={{
                    minHeight: "3rem",
                    width: "90%",
                    padding: "0.1rem",
                    gap: "1rem",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <div className=" flex  avatar relative">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                      style={{
                        height: "3rem",
                      }}
                    />
                    {contact.isOnline ? (
                      <FaCircle className="absolute bottom-0 right-0 text-green-400 text-xs" />
                    ): (
                      <span className="absolute bottom-0 right-0  text-xs">😴</span>
                    )}
    

                  </div>

                  <div className="username">
                    <h3 className="text-white">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
            
          </div>
          <div className="current-user bg-gray-800 flex justify-start items-center gap-8 py-3 px-4 ">
            <div className="avatar cursor-pointer relative ">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                style={{
                  height: "3rem",
                  maxInlineSize: "100%",
                }}
                className=""
              />
              <FaCircle className="absolute bottom-0 right-0 text-green-400 text-xs" />

            </div>
            <div className="username cursor-pointer">
                <h2 className='text-white'>{currentUserName}</h2>
                <span className="text-green-400">Đang hoạt động</span>
            </div>
          </div>
        </div>
        
      )}
    </>
  );
}
