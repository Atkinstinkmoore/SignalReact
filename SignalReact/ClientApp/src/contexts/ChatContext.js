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
  const [connection, setConnection] = useState(null)

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

        connection.on('RecieveMessage', (user, message, server) => {
          const updatedChat = [...latestChat.current];
          const timeElapsed = Date.now();
          const date = new Date(timeElapsed);
          updatedChat.push({name: user, message: message, timeStamp: `${date.getHours()}:${date.getMinutes()}`, server: server});

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
const logOut = async () => {
  try {
    await connection.invoke("LeaveRoom", {userName: user, roomName: room})
    setConnection(null);
    setChat([]);
  } catch (error) {
    console.error(error.message)
  }
}


  const value = {
    user,
    room,
    setUser,
    setRoom,
    joinRoom,
    chat,
    connection,
    sendMessage,
    logOut
  };

  return (
    <div>
      <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    </div>
  )
}
