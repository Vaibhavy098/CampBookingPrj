using CampBooking.Domain.Common;

namespace CampBooking.Domain.Entities
{
    public class Camp : AuditableEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal PricePerNight { get; set; }
        public int Capacity { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    }
}
