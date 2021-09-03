using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalReact.Models
{
    public class ChatMessage
    {
        public User User { get; set; }
        public string Message { get; set; }
        public DateTime TimeStamp { get; set; }

        public ChatMessage(User user, string message)
        {
            User = user;
            Message = message;
            TimeStamp = DateTime.UtcNow;
        }
    }
}
