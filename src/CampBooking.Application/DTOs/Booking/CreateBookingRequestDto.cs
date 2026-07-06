namespace CampBooking.Application.DTOs.Booking;

public class CreateBookingRequestDto
{
    public int CampId { get; set; }

    public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public string BillingAddress { get; set; } = string.Empty;

    public string CellPhone { get; set; } = string.Empty;
}