using System;
using System.Collections.Generic;

namespace MRBS.Models
{
    public partial class Booking
    {
        public int BookingId { get; set; }
        public int MeetingRoomId { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }

        public Event Event { get; set; }
        public MeetingRoom MeetingRoom { get; set; }
        public User User { get; set; }
    }
}
