using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalReact.Models
{
    public class Room
    {
        public string RoomName { get; set; }
        public List<User> Users { get; set; }
    }
}
