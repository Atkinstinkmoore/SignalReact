import React from 'react'

export default function ChatMessage({msg}) {
  return (
    <div>
      <h3>{msg.name} <i>{msg.timeStamp}</i></h3>
      <p>{msg.message}</p>
    </div>
  )
}
