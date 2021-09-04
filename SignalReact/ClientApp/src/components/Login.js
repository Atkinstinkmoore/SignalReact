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
        e.preventDefault();
        joinRoom(user, room);
      }}>
      <input className="textbox" type="text" placeholder="Namn" onChange={e => setUser(e.target.value)} />
      <select className="dropdown" name="rooms" onChange={e => setRoom(e.target.value)} defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>Välj ett chattrum</option>
        {rooms && rooms.map(r => { return <option value={r}>{r}</option>})}
      </select>
      <button className="btn btn__light" type="submit" disabled={!user || !room}>Logga in</button>
    </form>
    )}
    </>
  )
}
