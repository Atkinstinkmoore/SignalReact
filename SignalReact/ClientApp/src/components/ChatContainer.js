import React from "react";
import { useChat } from "../contexts/ChatContext";
import ChatMessage from "./ChatMessage";

const ChatContainer = () => {
    const {connection, chat, user, room} = useChat()

    return (
        <>
        {connection && (
            <>
            <h2>{room}</h2>
            <>
                {chat.map(msg => {return <ChatMessage msg={msg}/>})}
            </>
            </>
            )}
      </>
    )
};

export default ChatContainer;