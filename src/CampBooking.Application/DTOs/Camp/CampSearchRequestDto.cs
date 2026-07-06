namespace CampBooking.Application.DTOs.Camp;

public class CampSearchRequestDto
{
    public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public int? Capacity { get; set; }

    public int PageNumber { get; set; } = 1;

    public int PageSize { get; set; } = 10;
}