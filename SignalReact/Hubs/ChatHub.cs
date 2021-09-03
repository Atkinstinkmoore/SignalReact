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
            var message = new ChatMessage(new User() { UserName = "Bottis", RoomName = user.RoomName },
                      $"{user.UserName} har anslutit till chatten");
            var userMessage = new ChatMessage(new User() { UserName = "Bottis", RoomName = user.RoomName },
                      $"Välkommen till chatten {user.UserName}");

            await Clients.Group(room.RoomName).SendAsync("RecieveMessage", message);
            await Clients.Client(Context.ConnectionId).SendAsync("RecieveMessage", userMessage);


        }
        public async Task LeaveRoom(User user)
        {
            var room = _db.Rooms.SingleOrDefault(r => r.RoomName == user.RoomName);
            if (room != null)
            {

                user.RoomName = null;
                room.Users.Remove(user);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, room.RoomName);

                var message = new ChatMessage(new User(){ UserName = "Bottis", RoomName = user.RoomName },
                    $"{user.UserName} har lämnat chatten");

                await Clients.Group(room.RoomName).SendAsync("RecieveMessage", message);

            }
        }
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.Group(message.User.RoomName).SendAsync("RecieveMessage", message);

        }
    }
}
