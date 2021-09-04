using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SignalReact.Hubs;
using Microsoft.AspNetCore.SignalR;
using SignalReact.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SignalReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hub;

        public AdminController(IHubContext<ChatHub> hub)
        {
            _hub = hub;
        }

        // POST api/<AdminController>
        [HttpPost]
        public void Post([FromBody] ServerMessage message)
        {
            _hub.Clients.All.SendAsync("RecieveMessage", "Server-message", message.Message, true);
        }

    }
}
