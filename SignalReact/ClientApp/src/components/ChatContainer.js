import React from "react";
import { useChat } from "../contexts/ChatContext";
import ChatMessage from "./ChatMessage";

const ChatContainer = () => {
    const {connection, chat, room, logOut} = useChat()

    return (
        <>
        {connection && (
            <>
            <button onClick={() => logOut()}>Logga ut</button>
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