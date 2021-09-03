import React from 'react'

export default function ChatMessage({msg}) {
    return (
    <>
        {(msg.server ?
            <div>
                <h3>{msg.name} <i>{msg.timeStamp}</i></h3>
                <p>{msg.message}</p>
            </div>
                :
            <div>
                <h3>{msg.name} <i>{msg.timeStamp}</i></h3>
                <p>{msg.message}</p>
            </div>
          )}
     </>
  )
}
