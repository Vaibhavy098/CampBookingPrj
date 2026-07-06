namespace CampBooking.Application.Interfaces.Authentication;

public interface IJwtTokenGenerator
{
    Task<string> GenerateTokenAsync(
        string userId,
        string email,
        IList<string> roles);
}