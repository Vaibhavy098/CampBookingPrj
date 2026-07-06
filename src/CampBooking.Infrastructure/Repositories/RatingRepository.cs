using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Domain.Entities;
using CampBooking.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CampBooking.Infrastructure.Repositories;

public class RatingRepository : IRatingRepository
{
    private readonly ApplicationDbContext _context;

    public RatingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Rating rating)
    {
        await _context.Ratings.AddAsync(rating);
    }

    public async Task UpdateAsync(Rating rating)
    {
        _context.Ratings.Update(rating);
        await Task.CompletedTask;
    }

    public async Task<Rating?> GetByIdAsync(int ratingId)
    {
        return await _context.Ratings
            .Include(r => r.Camp)
            .FirstOrDefaultAsync(r => r.Id == ratingId);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}