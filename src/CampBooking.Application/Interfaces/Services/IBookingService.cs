using CampBooking.Application.DTOs.Booking;

namespace CampBooking.Application.Interfaces.Services;

public interface IBookingService
{
    Task<BookingResponseDto> CreateAsync(
        CreateBookingRequestDto request,
        string userId);

    Task<List<BookingListItemDto>> GetUserBookingsAsync(
        string userId);

    Task<List<BookingListItemDto>> GetAllAsync();
    Task<BookingResponseDto> GetByReferenceAsync(
    string bookingReference,
    string userId);

    Task CancelAsync(int bookingId, string userId);
}