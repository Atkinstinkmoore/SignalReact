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
        private readonly string botname = "Bottis";

        public ChatHub(IRepo db)
        {
            _db = db;
        }

        public override Task OnConnectedAsync()
        {
            var user = _db.Users.SingleOrDefault(u => u.ID == Context.ConnectionId);
            if(user == null)
            {
                user = new DbUser()
                {
                    ID = Context.ConnectionId
                };

                _db.Users.Add(user);
            }
            return base.OnConnectedAsync();
        }

        public async Task JoinRoom(User user)
        {
            // Create user in "DB" based on connectionID
            var dbUser = _db.Users.SingleOrDefault(u => u.ID == Context.ConnectionId);
            dbUser.Name = user.UserName;
            dbUser.Room = user.RoomName;

            var message = $"{user.UserName} har anslutit till chatten";
            await Clients.Group(user.RoomName).SendAsync("RecieveMessage",botname, message);

            await Groups.AddToGroupAsync(Context.ConnectionId, user.RoomName);
            await UpdateUsersInRoom(user.RoomName);

            var userMessage = $"Välkommen till chatten, {user.UserName}";
            await Clients.Client(Context.ConnectionId).SendAsync("RecieveMessage",botname, userMessage, false);


        }
        public async Task LeaveRoom(User user)
        {
            //TODO: use connectionID to send message instead of relying on input
            var dbUser = _db.Users.SingleOrDefault(u => u.ID == Context.ConnectionId);
            dbUser.Room = "";
                
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, user.RoomName);

            await UpdateUsersInRoom(user.RoomName);

            var message = $"{user.UserName} har lämnat chatten";

            await Clients.Group(user.RoomName).SendAsync("RecieveMessage", botname, message, false);

            
        }
        public async Task SendMessage(string user, string room, string message)
        {
            await Clients.Group(room).SendAsync("RecieveMessage", user, message, false);

        }

        public async Task UpdateUsersInRoom(string room)
        {
            await Clients.Group(room).SendAsync("UpdateUsersInRoom");
        }
        //TODO: send message on disconnect, need socketID saved to user in "DB"
        public override Task OnDisconnectedAsync(Exception exception)
        {
            var user = _db.Users.SingleOrDefault(u => u.ID == Context.ConnectionId);

            if (user != null)
            {
                UpdateUsersInRoom(user.Room);   
                _db.Users.Remove(user);

            }

            
            return base.OnDisconnectedAsync(exception);
        }
    }
}
