namespace CampBooking.Application.DTOs.Camp;

public class CampListItemDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public decimal PricePerNight { get; set; }

    public int Capacity { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

    public double AverageRating { get; set; }

    public int TotalRatings { get; set; }
}