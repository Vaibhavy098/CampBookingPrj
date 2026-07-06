namespace CampBooking.Application.DTOs.Rating;

public class RatingResponseDto
{
    public int Id { get; set; }

    public int Stars { get; set; }

    public string? Review { get; set; }

    public string CampName { get; set; } = string.Empty;
}