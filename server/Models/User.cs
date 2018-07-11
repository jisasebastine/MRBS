using System;
using System.Collections.Generic;

namespace youbefit.Models
{
    public partial class User
    {
        public int Userid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public User(string username, string password, string email = "")
        {
            Username = username;
            Password = password;
            Email = email;
        }              
    }
}
