using System;
using System.Collections.Generic;

namespace youbefit.Models
{
    public partial class MeetingRoom
    {
        public MeetingRoom()
        {
            Booking = new HashSet<Booking>();
            Event = new HashSet<Event>();
        }

        public int MeetingRoomId { get; set; }
        public DateTime[] NextBooking { get; set; }
        public string MeetingRoomName { get; set; }
        public bool Vacant { get; set; }

        public ICollection<Booking> Booking { get; set; }
        public ICollection<Event> Event { get; set; }
    }
}
