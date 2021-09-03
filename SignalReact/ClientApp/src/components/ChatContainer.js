import React from "react";
import { useChat } from "../contexts/ChatContext";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const ChatContainer = () => {
    const {connection, chat, room, logOut} = useChat()

    return (
        <>
        {connection && (
            <div className="chat-container">
                <header className="header">
                    <h2 className="room">{room}</h2>
                    <button className="btn" onClick={() => logOut()}>Logga ut</button>
                </header>
                <main className="main">
                <>
                    {chat.map(msg => {return <ChatMessage msg={msg}/>})}
                </>
                </main>
                <ChatForm />
            </div>
            )}
      </>
    )
};

export default ChatContainer;