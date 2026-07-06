using CampBooking.Domain.Enums;

namespace CampBooking.Application.DTOs.Booking;

public class BookingResponseDto
{
    public int Id { get; set; }

    public string BookingReference { get; set; } = string.Empty;

    public string CampName { get; set; } = string.Empty;

    public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public decimal PricePerNight { get; set; }

    public decimal TotalAmount { get; set; }

    public BookingStatus Status { get; set; }
}