using SignalReact.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalReact.Repo
{
    public interface IRepo
    {
        public List<DbUser> Users { get; set; }
    }
}
