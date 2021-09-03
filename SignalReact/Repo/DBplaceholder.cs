using SignalReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalReact.Repo
{
    public class DBplaceholder : IRepo
    {
        public List<User> Users { get; set; }
        public List<Room> Rooms { get; set; }

        public DBplaceholder()
        {
            Users = new List<User>();
            Rooms = new List<Room>();
        }
    }
}
