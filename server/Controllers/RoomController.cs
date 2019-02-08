using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using youbefit.Dtos;
using youbefit.Models;
using youbefit.Services;

namespace youbefit.Controllers
{
    [Route("[controller]")]
    public class RoomController: Controller
    {
        private readonly IMeetingRoomService _meetingRoomService;
        private readonly IUserService _userService;

        public RoomController(IMeetingRoomService meetingRoomService, IUserService userService)
        {
            _meetingRoomService = meetingRoomService;
            _userService = userService;
        }

        [HttpPost("getallrooms")]
        public IActionResult GetAllRooms()
        {
            var rooms = _meetingRoomService.GetRooms().ToList();
            return Ok(rooms);
        }

        [HttpPost("addroom")]
        public IActionResult AddRoom([FromBody] RoomDto room)
        {
            var new_room = _meetingRoomService.AddRoom(room.Roomname);
            if (new_room == null)
                return StatusCode(StatusCodes.Status409Conflict, new { message = "The meeting room is already added" });
            else return Ok( new { room = new_room, message = "The meeting room is already added" });
        }

        [HttpPost("getroom")]
        public IActionResult GetRoom([FromBody] RoomDto room)
        {
            var new_room = _meetingRoomService.GetRoom(room.MeetingRoomId);
            return Ok(new_room);
        }

        [HttpPost("getbooking")]
        public IActionResult GetBooking([FromBody] RoomDto room)
        {
            var roomid = Convert.ToInt32(room.MeetingRoomId);
            var bookings = _meetingRoomService.GetBooking(roomid);
            if (bookings == null)
                return StatusCode(StatusCodes.Status204NoContent, new { message = "No bookings yet" });
            var room_bookings = new List<Object>();
            foreach(var booking in bookings)
            {
                var user = _userService.GetUserById(booking.UserId.ToString());
                room_bookings.Add(new
                {
                    BookingId = booking.BookingId,
                    MeetingRoomId = booking.MeetingRoomId,
                    EvenId = booking.EventId,
                    StartTime = booking.StartTime,
                    EndTime = booking.EndTime,
                    UserId = user.Userid,
                    UserName = user.Username,
                    Email = user.Email
                });
            }
            return Ok(room_bookings);
        }

        [HttpPost("cancelbooking")]
        public IActionResult CancelBooking([FromBody] RoomDto room)
        {
            var startDate = room.StartDate.ToLocalTime();
            var endDate = room.EndDate.ToLocalTime();
            // cancel booking
            _meetingRoomService.CancelBooking(room.MeetingRoomId, room.UserId, room.StartDate, room.EndDate);
            //return the current bookings
            return GetBooking(room);
        }

        [HttpPost("bookroom")]
        public IActionResult BookRoom([FromBody] RoomDto room)
        {
            var startDate = room.StartDate.ToLocalTime();
            var endDate = room.EndDate.ToLocalTime();
            var new_room = _meetingRoomService.BookRoom(room.MeetingRoomId, room.UserId, room.StartDate, room.EndDate);
            if (new_room == null)
                return StatusCode(StatusCodes.Status409Conflict, new { message = "Room already booked during that time" });
            return GetBooking(room);
        }

        [HttpPost("getfreerooms")]
        public IActionResult GetFreeRooms([FromBody] RoomDto room)
        {
            var rooms = _meetingRoomService.GetFreeRooms(room.StartDate, room.EndDate).ToList();
            var meetingRooms = new List<MeetingRoom>();
            foreach(var mroom in rooms)
            {
                var mr = new MeetingRoom
                {
                    MeetingRoomId = mroom.MeetingRoomId,
                    MeetingRoomName = mroom.MeetingRoomName,
                    NextBooking = mroom.NextBooking,
                    Vacant = mroom.Vacant
                };
                meetingRooms.Add(mr);
            }
            return Ok(meetingRooms );
        }
    }
}
