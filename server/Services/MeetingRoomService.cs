using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using MRBS.Models;

namespace MRBS.Services
{
    public class MeetingRoomService : IMeetingRoomService
    {
        private readonly AppDbContext1 _appDbContext;
        private readonly IConfiguration _configuration;

        public MeetingRoomService(AppDbContext1 appDbContext, IConfiguration configuration)
        {
            _appDbContext = appDbContext;
            _configuration = configuration;
        }

        public MeetingRoom AddRoom(string meetingRoomName)
        {
            var room = _appDbContext.MeetingRoom.Where(mr => mr.MeetingRoomName.ToLower() == meetingRoomName.ToLower()).FirstOrDefault();

            if (room != null)
                return null;
            TextInfo textInfo = new CultureInfo("en-us", false).TextInfo;
            var meetingRoom = new MeetingRoom
            {
                MeetingRoomName = textInfo.ToTitleCase(meetingRoomName)
            };
            _appDbContext.MeetingRoom.Add(meetingRoom);
            _appDbContext.SaveChanges();
            return meetingRoom;
        }
                
        private int GetSlot(DateTime startTime, DateTime endTime)
        {
            return 0;
        }

        public MeetingRoom BookRoom(string meetingRoomId, string userId, DateTime startDate, DateTime endDate)
        {
            if (startDate >= endDate)
                return null;

            var room_id = Convert.ToInt32(meetingRoomId);
            var user_id = Convert.ToInt32(userId);
            MeetingRoom room = _appDbContext.MeetingRoom.Where(mr => mr.MeetingRoomId == room_id).SingleOrDefault();

            var existing_booking = _appDbContext.Booking.Where(e => e.MeetingRoomId == room_id && ((e.StartTime <= startDate && startDate < e.EndTime) || (e.StartTime < endDate && endDate <= e.EndTime))).FirstOrDefault();
            if (existing_booking != null)
                return null;
                           
            var new_event = new Event
            {
                Organizer = user_id,
                MeetingRoomId = room_id,
                StartTime = startDate,
                EndTime = endDate
            };
            //add the new event before booking so that the event id is tracked
            _appDbContext.Add(new_event);
            var new_booking = new Booking
            {
                MeetingRoomId = room_id,
                UserId = user_id,
                EventId = new_event.EventId,
                StartTime = startDate,
                EndTime = endDate
            };
            _appDbContext.Add(new_booking);
            _appDbContext.SaveChanges();
            return room;
        }


        public MeetingRoom GetRoom(string meetingRoomId)
        {
            var room_id = Convert.ToInt32(meetingRoomId);
            var room = _appDbContext.MeetingRoom.Where(mr => mr.MeetingRoomId == room_id).SingleOrDefault();
            return room;
        }

        public IQueryable<MeetingRoom> GetRooms()
        {
            return _appDbContext.MeetingRoom.Where(mr => mr.MeetingRoomId > 0);
        }

        public IQueryable<Booking> GetBooking(int roomid)
        {
            var bookings = _appDbContext.Booking.Where(mr => mr.MeetingRoomId == roomid);
            //foreach(var booking in bookings)
            //{
            //    booking.User = _appDbContext.User.Where(user => user.Userid == booking.UserId).SingleOrDefault();
            //}
            return bookings;
        }

        public IQueryable<MeetingRoom> GetFreeRooms(DateTime startDate, DateTime endDate)
        {
            // find bookings during given time
            // based on booking get the meeting rooms
            var meetingrooms = GetRooms();
            var bookings = _appDbContext.Booking.Where(booking => (startDate >= booking.StartTime && startDate < booking.EndTime) || (endDate > booking.StartTime && endDate <= booking.EndTime));
            //
            List<int> id_list = new List<int>();
            foreach (var booking in bookings)
            {
                id_list.Add(booking.MeetingRoomId);
            }
            foreach (var meetingroom in meetingrooms)
            {
                if(id_list.Contains(meetingroom.MeetingRoomId))
                {
                    meetingroom.Vacant = false;
                }
                else
                {
                    meetingroom.Vacant = true;
                }
            }
            
            return meetingrooms;
        }

        public bool CancelBooking(string meetingRoomId, string userId, DateTime startDate, DateTime endDate)
        {
            var room_id = Convert.ToInt32(meetingRoomId);
            var user_id = Convert.ToInt32(userId);
            Booking booking = _appDbContext.Booking.Where(bk => bk.MeetingRoomId == room_id &&
                                                                bk.StartTime == startDate &&
                                                                bk.EndTime == endDate &&
                                                                bk.UserId == user_id).FirstOrDefault();
            if (booking == null)
                return false;
            //remove booking and the associated event
            Event _event = _appDbContext.Event.Where(ev => ev.EventId == booking.EventId).SingleOrDefault();
            _appDbContext.Remove(_event);
            _appDbContext.Remove(booking);
            _appDbContext.SaveChanges();
            return true;
        }
    }
}
