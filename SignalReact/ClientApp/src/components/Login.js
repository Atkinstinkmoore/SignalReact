import React, { useState } from 'react'
import { useChat } from '../contexts/ChatContext';

export default function Login() {
  const {user, room, setUser, setRoom, connection, joinRoom} = useChat();

  return (
    <> {!connection && (
    <form className="login-form"
      onSubmit={e=> {
        e.preventDefault(user, room);
        joinRoom(user, room);
      }}>
      <input type="text" placeholder="Namn" onChange={e => setUser(e.target.value)} />
      <input type="text" placeholder="Rum" onChange={e => setRoom(e.target.value)} />
      <button type="submit" disabled={!user || !room}>Logga in</button>
    </form>
    )}
    </>
  )
}
