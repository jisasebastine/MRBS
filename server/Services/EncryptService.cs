using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace youbefit.Services
{
    public class EncryptService : IEncryptService
    {
        public EncryptService()
        {
        }

        public string hashPassword(string password)
        {
            string hashpass = "";
            foreach (char c in password)
            {
                hashpass += c + 9;
            }
            return hashpass;
        }
    }
}
