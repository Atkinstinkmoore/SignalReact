import React, { useContext, useState, useRef } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const ChatContext = React.createContext();

export function useChat(){
  return useContext(ChatContext);
}

export default function ChatProvider({children}) {
  const [user, setUser] = useState();
  const [usersInRoom, setUsersInRoom] = useState([])
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

  const updateUsers = async () => {
    const response = await fetch(`http://localhost:16015/api/room/${room}`);
    const data = await response.json();
    setUsersInRoom(data);
  }

  const joinRoom = async (user, room) => {
    try {
        const connection = connect();

        await connection.start();

        connection.on('RecieveMessage', (user, message, server) => {
          const updatedChat = [...latestChat.current];
          const timeElapsed = Date.now();
          const date = new Date(timeElapsed);
          const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString()  : date.getMinutes().toString()
          updatedChat.push({name: user, message: message, timeStamp: `${date.getHours().toString()}:${minutes}`, server: server});

          setChat(updatedChat);
        });

        connection.on("UpdateUsersInRoom", () => {
          updateUsers();
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
    logOut,
    usersInRoom
  };

  return (
    <div className="container">
      <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    </div>
  )
}
