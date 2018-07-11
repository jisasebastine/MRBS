using System;
using System.Collections.Generic;

namespace youbefit.Models
{
    public partial class Post
    {
        public int Postid { get; set; }
        public int Blogid { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }

        public Blog Blog { get; set; }
    }
}
