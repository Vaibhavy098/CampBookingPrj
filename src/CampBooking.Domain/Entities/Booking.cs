using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CampBooking.Domain.Common;
using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;

namespace CampBooking.Domain.Entities
{
    public  class Booking : AuditableEntity
    {
        public string BookingReference { get; set; } = string.Empty;
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public decimal PricePerNight { get; set; }
        public decimal TotalAmount { get; set; }
        public string BillingAddress { get; set; } = string.Empty;
        public string CellPhone { get; set; } = string.Empty;
        public BookingStatus Status { get; set; } = BookingStatus.Pending;
        public int CampId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public Camp Camp { get; set; } = null!;
        public Rating? Rating { get; set; }

    }
}
