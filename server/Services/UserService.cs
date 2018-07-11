using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using youbefit.Models;

namespace youbefit.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _appDbContext;
        private readonly IEncryptService _encodeService;

        public UserService(AppDbContext appDbContext, IEncryptService encodeService)
        {
            _appDbContext = appDbContext;
            _encodeService = encodeService;
        }

        public Blog IsBlogValid(string url)
        {
            var blogs = _appDbContext.Blog.Where(b => b.Url == url).SingleOrDefault();
            return blogs;
        }

        public void GetUser()
        {
            throw new NotImplementedException();
        }

        public User SignUp(string username, string password, string email)
        {
            var user = _appDbContext.User.Where(u => u.Username == username).SingleOrDefault();
            if(user != null)
            {
                return null;
            }
            user = new User(username, password, email);
            _appDbContext.User.Add(user);
            _appDbContext.SaveChanges();
            return user;
        }

        public User Login(string username, string password)
        {
            return _appDbContext.User.Where(u => u.Username == username && u.Password == password).SingleOrDefault();
        }
    }
}
