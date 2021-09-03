﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SignalReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        // GET: api/<RoomController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "Grön", "Röd", "Gul", "Orange" };
        }

    }
}