using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MRBS.Models;

namespace MRBS.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext1 _appDbContext;

        public UserService(AppDbContext1 appDbContext)
        {
            _appDbContext = appDbContext;
        }
        
        public User ValidateSignup(string username, string password, string email)
        {
            return _appDbContext.User.Where(u => u.Email.ToLower() == email.ToLower()).SingleOrDefault();
            
        }

        public User SignUp(string username, string password, string email)
        {
            var user = _appDbContext.User.Where(u => u.Email.ToLower() == email.ToLower()).SingleOrDefault();
            if(user != null)
            {
                return null;
            }
            user = new User
            {
                Username = username,
                Password = password,
                Email = email
            };
            _appDbContext.User.Add(user);
            _appDbContext.SaveChanges();
            return user;
        }

        public User Login(string username, string password)
        {
            return _appDbContext.User.Where(u => u.Username == username && u.Password == password).SingleOrDefault();
        }

        public User GetUserById(string userid)
        {
            var id = Convert.ToInt32(userid);
            return _appDbContext.User.Where(u => u.Userid == id).SingleOrDefault();
        }
    }
}
