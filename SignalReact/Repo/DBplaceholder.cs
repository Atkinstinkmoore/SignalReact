using SignalReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalReact.Repo
{
    public class DBplaceholder : IRepo
    {
        public List<DbUser> Users { get; set; }

        public DBplaceholder()
        {
            Users = new List<DbUser>();
        }
    }
}
