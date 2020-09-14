import React from 'react'
import "./sidebar.css";
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar , IconButton} from '@material-ui/core';
import { SearchOutlined} from '@material-ui/icons';
import SidebarChat from "./SidebarChat";
function Sidebar() {
    return (
        <div className="sidebar ">
            <div className="sidebar__header">
                <Avatar
                src="https://lh3.googleusercontent.com/-qBhN6M7e3co/X1edt3cD6xI/AAAAAAAALp4/8-cyv3HNRLMmR4uq9yl4d_3gGhjkHHIVwCK8BGAsYHg/s0/2020-09-08.jpg"/>
              <div className="sidebar__headerRight">
                 <IconButton>
                     <DonutLargeIcon/>
                 </IconButton>
                 <IconButton>
                     <ChatIcon/>
                 </IconButton>
                 <IconButton>
                     <MoreVertIcon/>
                 </IconButton>
              </div>
            
            </div>
            <div className="sidebar__search"> 
                <div className="sidebar__searchContainer">
                   <SearchOutlined/>
                   <input placeholder="Search or start new chat" type="text">
                   </input>
                </div>
            </div>
            <div className="sidebar__chat">
                    <SidebarChat/>
                    <SidebarChat/>
                    <SidebarChat/>
            </div>
        </div>
    )
}

export default Sidebar
