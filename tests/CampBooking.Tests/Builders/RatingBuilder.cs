using CampBooking.Domain.Entities;

namespace CampBooking.Tests.Builders;

public static class RatingBuilder
{
    public static Rating Create()
    {
        return new Rating
        {
            Id = 1,
            CampId = 1,
            BookingId = 1,
            UserId = "user1",
            Stars = 5,
            Review = "Excellent",
            Camp = CampBuilder.Create()
        };
    }
}