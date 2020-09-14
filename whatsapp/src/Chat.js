import React,{useState} from 'react'
import "./chat.css";
import {Avatar} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";


function Chat({messages}) {
    const [input, setInput]= useState('');
    const sendMessage = async (e) =>{
        e.preventDefault();
    await axios.post('/messages/new',{
         message: input,
         name:"eiooj",
         timestamp:"gggjhh",
         received: false,
     })
    };


    return (
        <div className="chat">
           <div className="chat__header">
              <Avatar/>
                   <div className="chat__headerInfo">
                        <h3>Room Name</h3>
                        <p>Last Seen at ...</p>
                   </div>
                   <div className="chat__headerRight">
                        <IconButton>
                            <SearchOutlined/>
                        </IconButton>
                        <IconButton>
                     <AttachFileIcon/>
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                   </div>
               </div>
               
                 <div className="chat__body">
                     {messages.map((message)=>(
                  <p className={`chat__message ${message.received && "chat__receiver"}`}>
             <span className="chat__name">{message.name}</span>
                    {message.message}
                   <span className = "chat__timestamp">
               {message.timestamp}
               </span>
                        </p>

                     ))}


                    
                     <div className="chat__message chat__reciever">
                         <span className="chat__name">Sony</span>
                     This for you.
                     <span className = "chat__timestamp">
                       {new Date().toUTCString()}
                     </span>
                     </div>
                     <div className="chat__message">
                         <span className="chat__name">Sony</span>
                     This is message for you.
                     <span className = "chat__timestamp">
                       {new Date().toUTCString()}
                     </span>
                     </div>
                 </div>
                 <div className="chat__footer">
                         <IconButton>
                             <EmojiEmotionsIcon/>
                             </IconButton>
                         <form>
                             <input value={input} onChange={(e)=>setInput(e.target.value)}  type="text" placeholder="Type a message">
                             </input>
                             <button onClick={sendMessage} type="submit">
                                 Send a message
                             </button>
                             </form>
                             <IconButton>
                             <MicIcon/>
                             </IconButton>
                            
                       
                 </div>

        </div>
    )
}

export default Chat
