using System;
using System.Collections.Generic;
using System.Linq;
using MRBS.Models;

namespace MRBS.Services
{
    public interface IMeetingRoomService
    {
        IQueryable<MeetingRoom> GetRooms();
        MeetingRoom AddRoom(string meetingRoomName);
        MeetingRoom GetRoom(string meetingRoomId);
        IQueryable<Booking> GetBooking(int roomid);
        MeetingRoom BookRoom(string meetingRoomId, string userId, DateTime startDate, DateTime endDate);
        bool CancelBooking(string meetingRoomId, string userId, DateTime startDate, DateTime endDate);
        IQueryable<MeetingRoom> GetFreeRooms(DateTime startDate, DateTime endDate);
    }
}