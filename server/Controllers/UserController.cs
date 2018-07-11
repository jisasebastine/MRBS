using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using youbefit.Dtos;
using youbefit.Models;
using youbefit.Services;

namespace youbefit.Controllers
{
    [AllowAnonymous]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private IUserService _userService;
        private IEncryptService _encryptService;

        public UserController(IUserService userService, IEncryptService encryptService)
        {
            _userService = userService;
            _encryptService = encryptService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UserDto user)
        {
            var new_user = _userService.Login(user.Username, _encryptService.hashPassword(user.Password));
            if (new_user == null)
                return Ok();
            return Ok(new_user);
        }

        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] UserDto user)
        {
            var new_user = _userService.SignUp(user.Username, _encryptService.hashPassword(user.Password), user.Email);
            if(new_user == null)
            {
                return Ok(new { message = "The username already exists. Please try a different username" });
            }
            return Ok(new_user);
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
