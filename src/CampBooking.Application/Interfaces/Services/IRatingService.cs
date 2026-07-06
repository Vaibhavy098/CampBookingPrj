using CampBooking.Application.DTOs.Rating;

namespace CampBooking.Application.Interfaces.Services;

public interface IRatingService
{
    Task<RatingResponseDto> CreateAsync(
        CreateRatingRequestDto request,
        string userId);

    Task UpdateAsync(
        int ratingId,
        UpdateRatingRequestDto request,
        string userId);
}