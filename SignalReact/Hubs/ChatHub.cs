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

        public async Task JoinRoom(User user)
        {
            // Create user in "DB" based on connectionID
            var message = $"{user.UserName} har anslutit till chatten";
            await Clients.Group(user.RoomName).SendAsync("RecieveMessage",botname, message);

            await Groups.AddToGroupAsync(Context.ConnectionId, user.RoomName);
            var userMessage = $"Välkommen till chatten, {user.UserName}";
            await Clients.Client(Context.ConnectionId).SendAsync("RecieveMessage",botname, userMessage, false);


        }
        public async Task LeaveRoom(User user)
        {
                //TODO: use connectionID to send message instead of relying on input
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, user.RoomName);

                var message = $"{user.UserName} har lämnat chatten";

                await Clients.Group(user.RoomName).SendAsync("RecieveMessage", botname, message, false);

            
        }
        public async Task SendMessage(string user, string room, string message)
        {
            await Clients.Group(room).SendAsync("RecieveMessage", user, message, false);

        }
        //TODO: send message on disconnect, need socketID saved to user in "DB"

    }
}
