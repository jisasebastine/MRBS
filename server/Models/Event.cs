using System;
using System.Collections.Generic;

namespace MRBS.Models
{
    public partial class Event
    {
        public Event()
        {
            Booking = new HashSet<Booking>();
        }

        public int EventId { get; set; }
        public int Organizer { get; set; }
        public string Purpose { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int MeetingRoomId { get; set; }

        public MeetingRoom MeetingRoom { get; set; }
        public ICollection<Booking> Booking { get; set; }
    }
}
