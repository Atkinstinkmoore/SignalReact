import React from "react";
import { useChat } from "../contexts/ChatContext";

const ChatContainer = () => {
    const {connection, chat, user, room} = useChat()

    return (
        <>
        {connection && (
            <>
            <h2>Nu är du i rum {room}, {user}</h2>
            {chat.map(msg => {return <p>{msg.message}</p>})}
            </>
            )}
      </>
    )
};

export default ChatContainer;