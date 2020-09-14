import React,{useEffect, useState} from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";


function App() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    axios.get('/messages/sync')
    .then(Response=>{
     setMessages(Response.data);
    })
   
  }, [])
  useEffect(() => {
    
    const pusher = new Pusher('85fb9b5d3a247b908e71', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage]);
    });

    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };
    
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
      <Sidebar/>
     <Chat messages={messages}/>
      </div>
   
    </div>
  );
}

export default App;
