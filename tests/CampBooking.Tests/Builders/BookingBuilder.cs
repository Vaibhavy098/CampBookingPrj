using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;

namespace CampBooking.Tests.Builders;

public static class BookingBuilder
{
    public static Booking Create()
    {
        return new Booking
        {
            Id = 1,
            BookingReference = "ABC12345",
            CampId = 1,
            UserId = "user1",

            CheckInDate = DateTime.UtcNow.AddDays(5),
            CheckOutDate = DateTime.UtcNow.AddDays(7),

            BillingAddress = "Delhi",
            CellPhone = "9999999999",

            PricePerNight = 1500,
            TotalAmount = 3000,

            Status = BookingStatus.Pending,

            Camp = CampBuilder.Create()
        };
    }
}