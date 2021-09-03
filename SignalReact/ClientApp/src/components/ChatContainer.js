import React, {useEffect } from "react";
import { useChat } from "../contexts/ChatContext";

const ChatContainer = () => {
    const {loggedIn, chat, user, room} = useChat()

    return (
        <>
        {loggedIn && (
            <>
            <h2>Nu är du i rum {room}, {user}</h2>
            {chat.map(msg => {return <div><p>{msg}</p></div>})}
            </>
            )}
      </>
    )
};

export default ChatContainer;