using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;
using CampBooking.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CampBooking.Infrastructure.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly ApplicationDbContext _context;

    public BookingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Booking booking)
    {
        await _context.Bookings.AddAsync(booking);
    }
    public async Task UpdateAsync(Booking booking)
    {
        _context.Bookings.Update(booking);
        await Task.CompletedTask;
    }
    public async Task<Booking?> GetByIdAsync(int id)
    {
        return await _context.Bookings
            .Include(b => b.Camp)
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<List<Booking>> GetUserBookingsAsync(string userId)
    {
        return await _context.Bookings
            .AsNoTracking()
            .Include(b => b.Camp)
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<Booking>> GetAllAsync()
    {
        return await _context.Bookings
            .AsNoTracking()
            .Include(b => b.Camp)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    public async Task<bool> HasOverlappingBookingAsync(
        int campId,
        DateTime checkInDate,
        DateTime checkOutDate)
    {
        var checkIn = DateTime.SpecifyKind(
            checkInDate,
            DateTimeKind.Utc);

        var checkOut = DateTime.SpecifyKind(
            checkOutDate,
            DateTimeKind.Utc);

        return await _context.Bookings.AnyAsync(b =>
            b.CampId == campId &&
            b.Status != BookingStatus.Cancelled &&
            b.CheckInDate < checkOut &&
            b.CheckOutDate > checkIn);
    }
    public async Task<Booking?> GetByReferenceAsync(string bookingReference)
    {
        return await _context.Bookings
            .Include(b => b.Camp)
            .FirstOrDefaultAsync(b =>
                b.BookingReference == bookingReference);
    }
    public async Task<Booking?> GetBookingForRatingAsync(int bookingId)
    {
        return await _context.Bookings
            .Include(b => b.Rating)
            .Include(b => b.Camp)
            .FirstOrDefaultAsync(b => b.Id == bookingId);
    }
    
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
