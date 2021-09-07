import React, { useEffect } from "react";
import { useChat } from "../contexts/ChatContext";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const ChatContainer = () => {
    const {connection, chat, room, logOut, usersInRoom} = useChat()

    useEffect(() => {
        try {
            const main = document.querySelector("#main");
            main.scrollTop = main.scrollHeight;
        } catch (e) {
            console.error(e)
        }
    });

    useEffect(() => {
        console.table(usersInRoom);
    }, [usersInRoom])

    return (
        <>
        {connection && (
            <div className="chat-container">
                <header className="header">
                    <h1>signalReact</h1>
                    <div className="nav">
                        <h2 className="room">{room}</h2>
                        <button className="btn" onClick={() => logOut()}>Logga ut</button>
                    </div>
                </header>
                <main id="main" className="main">
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