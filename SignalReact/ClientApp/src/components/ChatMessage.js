import React from 'react'

export default function ChatMessage({msg}) {
    return (
    <>
        {(msg.server ?
            <div className="chat-message admin">
                <h3>{msg.name} <i>{msg.timeStamp}</i></h3>
                <p>{msg.message}</p>
            </div>
                :
            <div className="chat-message user">
                <h3>{msg.name} <i>{msg.timeStamp}</i></h3>
                {msg.message.map(m => { return <p>{m}</p>})}
            </div>
          )}
     </>
  )
}
