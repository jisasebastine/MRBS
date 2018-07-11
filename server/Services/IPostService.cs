using System.Linq;
using youbefit.Models;

namespace youbefit.Services
{
    public interface IPostService
    {
        IQueryable<Blog> CreatePost();
    }
}