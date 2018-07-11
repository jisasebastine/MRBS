using System;
using System.Collections.Generic;

namespace youbefit.Models
{
    public partial class Blog
    {
        public Blog()
        {
            Post = new HashSet<Post>();
        }

        public int Blogid { get; set; }
        public string Url { get; set; }

        public ICollection<Post> Post { get; set; }
    }
}
