import React, { useContext, useState, useRef } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const ChatContext = React.createContext();

export function useChat(){
  return useContext(ChatContext);
}

export default function ChatProvider({children}) {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);
  const [connection, setConnection] = useState()

  latestChat.current = chat;

  const connect = () => {
    return new HubConnectionBuilder()
    .withUrl("http://localhost:16015/chat")
    .configureLogging(LogLevel.Information)
    .build();
  }

  const joinRoom = async (user, room) => {
    try {
        const connection = connect();

        await connection.start();

        connection.on('RecieveMessage', (user, message) => {
          const updatedChat = [...latestChat.current];
          updatedChat.push({name: user, message: message});

          setChat(updatedChat);
        });

        await connection.invoke("JoinRoom", {userName: user, roomName: room})

        setConnection(connection);
    } catch (e) {
        console.log(e);
    }
}
const sendMessage = async (message) => {
  try {
    await connection.invoke("SendMessage", user, room, message);
  } catch (error) {
    console.error(error.message);
  }
}


  const value = {
    user,
    room,
    setUser,
    setRoom,
    joinRoom,
    chat,
    connection
  };

  return (
    <div>
      <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    </div>
  )
}
