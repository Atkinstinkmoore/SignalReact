import React, { useContext, useState, useRef } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr';

const ChatContext = React.createContext();

export function useChat(){
  return useContext(ChatContext);
}

export default function ChatProvider({children}) {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [loggedIn, setLoggedIn] = useState(false)
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  const connect = () => {
    return new HubConnectionBuilder()
    .withUrl("http://localhost:16015/chat")
    .build();
  }

  const joinRoom = async (user, room) => {
    try {
        const connection = connect();

        await connection.start();
        setLoggedIn(true);
        connection.on('RecieveMessage', message => {
          const updatedChat = [...latestChat.current];
          updatedChat.push(message);

          setChat(updatedChat);
        });
        await connection.invoke("JoinRoom", {userName: user, roomName: room})
    } catch (e) {
        console.log(e);
    }
}


  const value = {
    user,
    room,
    setUser,
    setRoom,
    joinRoom,
    loggedIn,
    chat,
    connect
  };

  return (
    <div>
      <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    </div>
  )
}
