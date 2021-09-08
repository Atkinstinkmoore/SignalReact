import React from 'react'
import { useChat } from '../contexts/ChatContext'

export default function UserList() {
  const { usersInRoom } = useChat();

  return (
    <div className="userlist">
      <ul>
        {usersInRoom.map(u => {return <li>{u}</li> })}
      </ul>
    </div>
  )
}
