namespace CampBooking.Application.DTOs.Rating;

public class UpdateRatingRequestDto
{
    public int Stars { get; set; }

    public string? Review { get; set; }
}