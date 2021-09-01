using SignalReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalReact.Hubs
{
    public interface IChatClient
    {
        Task RecieveMessage(ChatMessage message);
    }
}
