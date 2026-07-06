namespace CampBooking.Application.DTOs.Camp;

public class UpdateCampRequestDto
{
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal PricePerNight { get; set; }

    public int Capacity { get; set; }

    public string ImageUrl { get; set; } = string.Empty;
}