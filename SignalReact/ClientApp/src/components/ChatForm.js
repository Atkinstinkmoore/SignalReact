import React, { useState, useEffect } from 'react'
import { useChat } from '../contexts/ChatContext'

export default function ChatForm() {
  const {sendMessage} = useChat();
  const [message, setMessage] = useState("");

  function submitOnEnter(e){
    if(e.which === 13){
      e.preventDefault();
      sendMessage(message);
      let text = document.querySelector("#text-area");
      text.value = "";
    }
  }

  useEffect(() => {
    document.querySelector("#text-area").addEventListener("keypress", submitOnEnter);

    return () => {
      document.querySelector("#text-area").removeEventListener("keypress", submitOnEnter);
    }
  })
  return (
    <form className="chat-form" onSubmit={e => {
      e.preventDefault();
      sendMessage(message);
      e.target.reset();
      setMessage("");
    }}>
      <textarea id="text-area" type="text" className="message-box" style={
        message ? { height: "4em" }: {}} placeholder="Skriv ett meddelande"
      required onChange={e => setMessage(e.target.value)} autoComplete="off"/>
      {message &&
        <button onClick={e=> {
          submitOnEnter(e);
        }} className="mobile-btn">▶</button>
      }
    </form>
  )
}
