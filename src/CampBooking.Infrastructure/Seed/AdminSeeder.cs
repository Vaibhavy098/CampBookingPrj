using CampBooking.Domain.Constants;
using CampBooking.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace CampBooking.Infrastructure.Seed;

public static class AdminSeeder
{
    public static async Task SeedAsync(UserManager<ApplicationUser> userManager)
    {
        const string email = "admin@campbooking.com";
        const string password = "Admin@123";

        var admin = await userManager.FindByEmailAsync(email);

        if (admin is not null)
            return;

        admin = new ApplicationUser
        {
            FullName = "System Administrator",
            UserName = email,
            Email = email,
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(admin, password);

        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(admin, Roles.Admin);
        }
    }
}