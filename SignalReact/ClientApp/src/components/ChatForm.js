import React, { useState } from 'react'
import { useChat } from '../contexts/ChatContext'

export default function ChatForm() {
  const {sendMessage} = useChat();
  const [message, setMessage] = useState();
  return (
    <form onSubmit={e=>{
      e.preventDefault();
      sendMessage(message)
    }}>
      <input type="text" id="message-box"
      required onChange={e => setMessage(e.target.value)}/>
      <div>emoji</div>
    </form>
  )
}
