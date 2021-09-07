using Microsoft.AspNetCore.Mvc;
using SignalReact.Repo;
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
        private readonly IRepo _db;

        public RoomController(IRepo db)
        {
            _db = db;
        }
        // GET: api/<RoomController>
        [HttpGet]
        public IActionResult GetRooms()
        {
            return Ok(new string[] { "Grön", "Röd", "Gul", "Orange" });
        }

        [HttpGet("{roomName}")]
        public IActionResult GetUsers(string roomName)
        {
            try
            {
                var users = _db.Users.FindAll(u => u.Room == roomName).Select(u => u.Name).ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.Message);
            }
        }

    }
}
