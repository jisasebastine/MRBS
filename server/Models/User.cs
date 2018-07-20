using System;
using System.Collections.Generic;

namespace youbefit.Models
{
    public partial class User
    {
        public User()
        {
            Booking = new HashSet<Booking>();
        }

        public int Userid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public ICollection<Booking> Booking { get; set; }
    }
}
