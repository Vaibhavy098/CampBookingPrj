using CampBooking.Domain.Entities;

namespace CampBooking.Application.Interfaces.Repositories;

public interface IBookingRepository
{
    Task AddAsync(Booking booking);
    Task UpdateAsync(Booking booking);
    Task<Booking?> GetByIdAsync(int id);

    Task<List<Booking>> GetUserBookingsAsync(string userId);

    Task<List<Booking>> GetAllAsync();

    Task<bool> HasOverlappingBookingAsync(
        int campId,
        DateTime checkInDate,
        DateTime checkOutDate);
    Task<Booking?> GetByReferenceAsync(string bookingReference);
    Task<Booking?> GetBookingForRatingAsync(int bookingId);
    Task SaveChangesAsync();
}