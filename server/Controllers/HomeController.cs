using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using youbefit.Models;
using youbefit.Services;

namespace youbefit.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    public class HomeController : Controller
    {
        private IPostService _postService;

        public HomeController(IPostService postService)
        {
            _postService = postService;
        }
        [HttpGet("index")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("about")]
        public IActionResult About()
        {
            var blog = _postService.CreatePost();
            IList<string> url_list = new List<string>();
            foreach (var item in blog)
            {
               url_list.Add(item.Url.ToString());
            }
            ViewData["Message"] = url_list;

            return Ok(new {url_list = url_list});
        }

        [HttpGet("contact")]
        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        [HttpGet("error")]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
