using CampBooking.Application.Common;
using CampBooking.Application.DTOs.Camp;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Domain.Entities;
using CampBooking.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using CampBooking.Domain.Enums;

namespace CampBooking.Infrastructure.Repositories;

public class CampRepository : ICampRepository
{
    private readonly ApplicationDbContext _context;

    public CampRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Camp camp)
    {
        await _context.Camps.AddAsync(camp);
    }

    public async Task UpdateAsync(Camp camp)
    {
        _context.Camps.Update(camp);
        await Task.CompletedTask;
    }

    public async Task<Camp?> GetByIdAsync(int id)
    {
        return await _context.Camps
            .Include(c => c.Ratings)
            .FirstOrDefaultAsync(c => c.Id == id && c.IsActive);
    }

    public async Task<List<Camp>> GetAllAsync()
    {
        return await _context.Camps
            .AsNoTracking()
            .Include(c => c.Ratings)
            .Where(c => c.IsActive)
            .OrderBy(c => c.Name)
            .ToListAsync();
    }
    public async Task<Camp?> GetCampForBookingAsync(int campId)
    {
        return await _context.Camps
            .Include(c => c.Bookings)
            .FirstOrDefaultAsync(c =>
                c.Id == campId &&
                c.IsActive);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Camps
            .AnyAsync(c => c.Id == id && c.IsActive);
    }

    public async Task<PagedResult<Camp>> SearchAvailableAsync(
        CampSearchRequestDto request)
    {
        var checkIn = DateTime.SpecifyKind(
            request.CheckInDate,
            DateTimeKind.Utc);

        var checkOut = DateTime.SpecifyKind(
            request.CheckOutDate,
            DateTimeKind.Utc);

        var query = _context.Camps
            .AsNoTracking()
            .Include(c => c.Bookings)
            .Include(c => c.Ratings)
            .Where(c => c.IsActive);

        if (request.Capacity.HasValue)
        {
            query = query.Where(c =>
                c.Capacity >= request.Capacity.Value);
        }

        query = query.Where(c =>
            !c.Bookings.Any(b =>
                b.Status != BookingStatus.Cancelled &&
                b.CheckInDate < checkOut &&
                b.CheckOutDate > checkIn));

        var totalCount = await query.CountAsync();

        var camps = await query
            .OrderBy(c => c.Name)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();

        return new PagedResult<Camp>
        {
            Items = camps,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            TotalCount = totalCount
        };
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}