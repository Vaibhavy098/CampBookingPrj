using CampBooking.Domain.Entities;
namespace CampBooking.Application.Interfaces.Repositories;
public interface IRatingRepository
{
    Task AddAsync(Rating rating);

    Task<Rating?> GetByIdAsync(int ratingId);

    Task UpdateAsync(Rating rating);

    Task SaveChangesAsync();
}