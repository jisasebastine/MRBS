using System.Linq;
using MRBS.Models;

namespace MRBS.Services
{
    public interface IUserService
    {
        User SignUp(string username, string password, string email);
        User Login(string username, string password);
        User GetUserById(string userid);
    }
}