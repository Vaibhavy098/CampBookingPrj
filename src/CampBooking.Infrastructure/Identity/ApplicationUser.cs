
using Microsoft.AspNetCore.Identity;

namespace CampBooking.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; } = string.Empty;
    }
}
