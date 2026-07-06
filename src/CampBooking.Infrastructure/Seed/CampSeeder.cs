using CampBooking.Domain.Entities;
using CampBooking.Infrastructure.Data;

namespace CampBooking.Infrastructure.Seed;

public static class CampSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        if (context.Camps.Any())
            return;

        var camps = new List<Camp>
        {
            new Camp
            {
                Name = "River Camp",
                Description = "Beautiful riverside camping experience.",
                Capacity = 2,
                PricePerNight = 1200,
                ImageUrl = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
                IsActive = true
            },

            new Camp
            {
                Name = "Mountain Camp",
                Description = "Enjoy breathtaking mountain views.",
                Capacity = 4,
                PricePerNight = 1800,
                ImageUrl = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                IsActive = true
            },

            new Camp
            {
                Name = "Forest Camp",
                Description = "Stay inside peaceful forests.",
                Capacity = 6,
                PricePerNight = 1500,
                ImageUrl = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                IsActive = true
            },

            new Camp
            {
                Name = "Lake View Camp",
                Description = "Camp beside a beautiful lake.",
                Capacity = 2,
                PricePerNight = 2200,
                ImageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                IsActive = true
            },

            new Camp
            {
                Name = "Luxury Cabin",
                Description = "Premium wooden cabin stay.",
                Capacity = 8,
                PricePerNight = 3500,
                ImageUrl = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
                IsActive = true
            },

            new Camp
            {
                Name = "Desert Camp",
                Description = "Experience camping under the stars.",
                Capacity = 4,
                PricePerNight = 2000,
                ImageUrl = "https://images.unsplash.com/photo-1472396961693-142e6e269027",
                IsActive = true
            }
        };

        await context.Camps.AddRangeAsync(camps);

        await context.SaveChangesAsync();
    }
}