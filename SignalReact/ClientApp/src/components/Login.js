import React, {useEffect, useState} from 'react'
import { useChat } from '../contexts/ChatContext';

export default function Login() {
  const {user, room, setUser, setRoom, connection, joinRoom} = useChat();
  const [rooms, setRooms] = useState([]);



  useEffect(() => {
    async function getRooms() {
      const url = "http://localhost:16015/api/room";
      const response = await fetch(url);
      const data = await response.json();
      setRooms(data);
    }
    getRooms();
  }, [])

  return (
    <> {!connection && (
    <form className="login-form"
      onSubmit={e=> {
        e.preventDefault(user, room);
        joinRoom(user, room);
      }}>
      <input type="text" placeholder="Namn" onChange={e => setUser(e.target.value)} />
      <select name="rooms" onChange={e => setRoom(e.target.value)}>
        {rooms && rooms.map(r => { return <option value={r}>{r}</option>})}
      </select>
      <button type="submit" disabled={!user || !room}>Logga in</button>
    </form>
    )}
    </>
  )
}
