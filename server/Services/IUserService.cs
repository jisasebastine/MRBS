using System.Linq;
using youbefit.Models;

namespace youbefit.Services
{
    public interface IUserService
    {
        User SignUp(string username, string password, string email);
        User Login(string username, string password);
        User GetUserById(string userid);
    }
}