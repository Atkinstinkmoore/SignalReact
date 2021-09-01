using Microsoft.AspNetCore.SignalR;
using SignalReact.Models;
using SignalReact.Repo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalReact.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        private readonly IRepo _db;

        public ChatHub(IRepo db)
        {
            _db = db;
        }
        public override async Task OnConnectedAsync()
        {
            var user = _db.Users.SingleOrDefault(u => u.UserName == Context.User.Identity.Name);

            if(user == null)
            {
                user = new User()
                {
                    UserName = Context.User.Identity.Name
                };
                _db.Users.Add(user);
            }

            await base.OnConnectedAsync();
        }

        public async Task AddToRoom(string roomName)
        {
            var room = _db.Rooms.Find(r => r.RoomName == roomName);
            var user = _db.Users.SingleOrDefault(u => u.UserName == Context.User.Identity.Name);

            if(room == null)
            {
                room = new Room()
                {
                    RoomName = roomName
                };
            }

            user.Room = room;
            room.Users.Add(user);

            await Groups.AddToGroupAsync(Context.ConnectionId, room.RoomName);
            var message = new ChatMessage("Bottis", $"{user.UserName} har anslutit till chatten");

            await Clients.Group(room.RoomName).RecieveMessage(message);


        }
        public async Task RemoveFromRoom(string roomName)
        {
            var room = _db.Rooms.Find(r => r.RoomName == roomName);
            var user = _db.Users.SingleOrDefault(u => u.UserName == Context.User.Identity.Name);
            if (room != null)
            {


                user.Room = null;
                room.Users.Remove(user);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, room.RoomName);

                var message = new ChatMessage("Bottis", $"{user.UserName} har lämnat chatten");

                await Clients.Group(room.RoomName).RecieveMessage(message);

            }
        }
        public async Task SendMessage(ChatMessage message)
        {
            var user = _db.Users.SingleOrDefault(u => u.UserName == Context.User.Identity.Name);

            if(user != null)
            {
                await Clients.Group(user.Room.RoomName).RecieveMessage(message);

            }
        }
    }
}
