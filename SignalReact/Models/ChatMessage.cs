using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalReact.Models
{
    public class ChatMessage
    {
        public string UserName { get; set; }
        public string Message { get; set; }

        public ChatMessage(string user, string message)
        {
            UserName = user;
            Message = message;
        }
    }
}
