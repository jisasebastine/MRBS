using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using youbefit.Models;

namespace youbefit.Services
{
    public class PostService : IPostService
    {
        private readonly AppDbContext _appDbContext;

        public PostService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public IQueryable<Blog> CreatePost()
        {
            var blog = _appDbContext.Blog.Where(b => b.Blogid > 0);
            return blog;
        }

    }
}
