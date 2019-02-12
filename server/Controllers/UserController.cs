using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MRBS.Dtos;
using MRBS.Models;
using MRBS.Services;

namespace MRBS.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IEncryptService _encryptService;

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
                return StatusCode(StatusCodes.Status401Unauthorized, new { message = "Your username or password is invalid. Please try again" });
            return Ok(new_user);
        }

        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] UserDto user)
        {
            var new_user = _userService.SignUp(user.Username, _encryptService.hashPassword(user.Password), user.Email);
            if(new_user == null)
            {
                return StatusCode(StatusCodes.Status409Conflict, new { message = "The user already exists. Please Login" , user = new_user});
            }
            return Ok(new { message = "Sign up was successful", user = new_user});
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
