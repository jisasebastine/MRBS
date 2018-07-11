using System.Linq;
using youbefit.Models;

namespace youbefit.Services
{
    public interface IUserService
    {
        Blog IsBlogValid(string url);
        void GetUser();
        User SignUp(string username, string password, string email);
        User Login(string username, string password);
    }
}