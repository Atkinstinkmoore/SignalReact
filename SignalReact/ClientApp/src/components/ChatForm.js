import React, { useState } from 'react'
import { useChat } from '../contexts/ChatContext'

export default function ChatForm() {
  const {sendMessage} = useChat();
  const [message, setMessage] = useState();
  return (
    <form className="chat-form" onSubmit={e=>{
      e.preventDefault();
      sendMessage(message);
      e.target.reset();
    }}>
      <input type="text" className="message-box" placeholder="Skriv ett meddelande"
      required onChange={e => setMessage(e.target.value)} autoComplete="off"/>
    </form>
  )
}
