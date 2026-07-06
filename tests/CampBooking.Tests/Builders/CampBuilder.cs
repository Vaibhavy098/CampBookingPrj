using CampBooking.Domain.Entities;

namespace CampBooking.Tests.Builders;

public static class CampBuilder
{
    public static Camp Create()
    {
        return new Camp
        {
            Id = 1,
            Name = "Mountain Camp",
            Description = "Beautiful Camp",
            Capacity = 5,
            PricePerNight = 1500,
            ImageUrl = "camp.jpg",
            IsActive = true
        };
    }
}