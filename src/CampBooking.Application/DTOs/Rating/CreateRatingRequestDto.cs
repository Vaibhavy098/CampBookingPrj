namespace CampBooking.Application.DTOs.Rating;

public class CreateRatingRequestDto
{
    public int BookingId { get; set; }

    public int Stars { get; set; }

    public string? Review { get; set; }
}