import React from "react";
import { useChat } from "../contexts/ChatContext";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const ChatContainer = () => {
    const {connection, chat, room, logOut} = useChat()

    return (
        <>
        {connection && (
            <>
                <header>
                    <h2>{room}</h2>
                    <button onClick={() => logOut()}>Logga ut</button>
                </header>
                <main>
                <div>
                    {chat.map(msg => {return <ChatMessage msg={msg}/>})}
                </div>
                <ChatForm />
                </main>
            </>
            )}
      </>
    )
};

export default ChatContainer;