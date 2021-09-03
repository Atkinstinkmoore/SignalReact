using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using SignalReact.Models;
using SignalReact.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalReact.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IRepo _db;

        public ChatHub(IRepo db)
        {
            _db = db;
        }

        public async Task JoinRoom(User user)
        {
            var room = _db.Rooms.SingleOrDefault(r => r.RoomName == user.RoomName);

            if(room == null)
            {
                room = new Room()
                {
                    RoomName = user.RoomName,
                    Users = new List<User>()
                };

                _db.Rooms.Add(room);
            }

            room.Users.Add(user);

            await Groups.AddToGroupAsync(Context.ConnectionId, room.RoomName);
            var message = $"{user.UserName} har anslutit till chatten";
            var userMessage = $"Välkommen till chatten {user.UserName}";

            await Clients.Group(room.RoomName).SendAsync("RecieveMessage","Bottis", message);
            await Clients.Client(Context.ConnectionId).SendAsync("RecieveMessage","Bottis", userMessage);


        }
        public async Task LeaveRoom(User user)
        {
            var room = _db.Rooms.SingleOrDefault(r => r.RoomName == user.RoomName);
            if (room != null)
            {

                user.RoomName = null;
                room.Users.Remove(user);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, room.RoomName);

                var message = $"{user.UserName} har lämnat chatten";

                await Clients.Group(room.RoomName).SendAsync("RecieveMessage", "Bottis", message);

            }
        }
        public async Task SendMessage(string user, string room, string message)
        {
            await Clients.Group(room).SendAsync("RecieveMessage", user, message);

        }
    }
}
