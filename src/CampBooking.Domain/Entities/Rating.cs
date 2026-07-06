using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CampBooking.Domain.Common;
using CampBooking.Domain.Entities;

namespace CampBooking.Domain.Entities
{
    public class Rating : AuditableEntity
    {
        public int Stars { get; set; }
        public string? Review { get; set; }
        public int CampId { get; set; }
        public int BookingId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public Camp Camp { get; set; } = null!;
        public Booking Booking { get; set; } = null!;
    }
}
