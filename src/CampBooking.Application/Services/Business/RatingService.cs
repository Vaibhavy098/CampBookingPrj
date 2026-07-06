using AutoMapper;
using CampBooking.Application.DTOs.Rating;
using CampBooking.Application.Exceptions;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;
namespace CampBooking.Application.Services.Business;

public class RatingService : IRatingService
{
    private readonly IBookingRepository _bookingRepository;

    private readonly IRatingRepository _ratingRepository;
    private readonly IMapper _mapper;

    public RatingService(
        IBookingRepository bookingRepository, IRatingRepository ratingRepository,
        IMapper mapper)
    {
        _bookingRepository = bookingRepository;
        _ratingRepository = ratingRepository;
        _mapper = mapper;
    }

    public async Task<RatingResponseDto> CreateAsync(
        CreateRatingRequestDto request,
        string userId)
    {
        var booking = await _bookingRepository
            .GetBookingForRatingAsync(request.BookingId);

        if (booking is null)
            throw new NotFoundException("Booking not found.");

        if (booking.UserId != userId)
            throw new ForbiddenException(
                "You are not allowed to rate this booking.");

        if (booking.Status == BookingStatus.Cancelled) 
            throw new ConflictException(
                "Cancelled bookings cannot be Rated");

        if (booking.CheckOutDate.Date >= DateTime.UtcNow.Date)
            throw new ConflictException(
                "Rating can only be added after your stay is completed.");

        if (booking.Rating is not null)
            throw new ConflictException(
                "This booking has already been rated.");

        var rating = new Rating
        {
            BookingId = booking.Id,
            CampId = booking.CampId,
            UserId = userId,
            Stars = request.Stars,
            Review = request.Review
        };

        await _ratingRepository.AddAsync(rating);

        await _ratingRepository.SaveChangesAsync();

        rating.Camp = booking.Camp;

        return _mapper.Map<RatingResponseDto>(rating);
    }

    public async Task UpdateAsync(
        int ratingId,
        UpdateRatingRequestDto request,
        string userId)
    {
        var rating = await _ratingRepository
            .GetByIdAsync(ratingId);

        if (rating is null)
            throw new NotFoundException("Rating not found.");

        if (rating.UserId != userId)
            throw new ForbiddenException(
                "You are not allowed to edit this rating.");

        rating.Stars = request.Stars;
        rating.Review = request.Review;

        await _ratingRepository.SaveChangesAsync();
    }
}