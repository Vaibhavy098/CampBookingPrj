using AutoMapper;
using CampBooking.Application.DTOs.Rating;
using CampBooking.Application.Exceptions;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Services.Business;
using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;
using CampBooking.Tests.Builders;
using CampBooking.Tests.Helpers;
using FluentAssertions;
using Moq;

namespace CampBooking.Tests.Services;

public class RatingServiceTests
{
    private readonly Mock<IBookingRepository> _bookingRepository;
    private readonly Mock<IRatingRepository> _ratingRepository;

    private readonly IMapper _mapper;
    private readonly RatingService _service;

    public RatingServiceTests()
    {
        _bookingRepository = new Mock<IBookingRepository>();
        _ratingRepository = new Mock<IRatingRepository>();

        _mapper = MappingProfileFactory.CreateMapper();

        _service = new RatingService(
            _bookingRepository.Object,
            _ratingRepository.Object,
            _mapper);
    }

    [Fact]
    public async Task CreateAsync_Should_Create_Rating()
    {
        // Arrange

        var booking = BookingBuilder.Create();

        booking.Status = BookingStatus.Completed;
        booking.CheckOutDate = DateTime.UtcNow.AddDays(-2);
        booking.Rating = null;

        _bookingRepository
            .Setup(x => x.GetBookingForRatingAsync(1))
            .ReturnsAsync(booking);

        var request = new CreateRatingRequestDto
        {
            BookingId = 1,
            Stars = 5,
            Review = "Amazing Stay"
        };

        // Act

        var result =
            await _service.CreateAsync(request, "user1");

        // Assert

        result.Should().NotBeNull();

        result.Stars.Should().Be(5);

        _ratingRepository.Verify(
            x => x.AddAsync(It.IsAny<Rating>()),
            Times.Once);

        _ratingRepository.Verify(
            x => x.SaveChangesAsync(),
            Times.Once);
    }

    [Fact]
    public async Task CreateAsync_Should_Throw_When_Booking_Is_Cancelled()
    {
        // Arrange

        var booking = BookingBuilder.Create();

        booking.Status = BookingStatus.Cancelled;

        _bookingRepository
            .Setup(x => x.GetBookingForRatingAsync(1))
            .ReturnsAsync(booking);

        var request = new CreateRatingRequestDto
        {
            BookingId = 1,
            Stars = 5
        };

        // Act

        Func<Task> act =
            async () => await _service.CreateAsync(request, "user1");

        // Assert

        await act.Should()
            .ThrowAsync<ConflictException>();
    }

    [Fact]
    public async Task CreateAsync_Should_Throw_When_Booking_Already_Rated()
    {
        // Arrange

        var booking = BookingBuilder.Create();

        booking.Status = BookingStatus.Completed;
        booking.CheckOutDate = DateTime.UtcNow.AddDays(-3);
        booking.Rating = RatingBuilder.Create();

        _bookingRepository
            .Setup(x => x.GetBookingForRatingAsync(1))
            .ReturnsAsync(booking);

        var request = new CreateRatingRequestDto
        {
            BookingId = 1,
            Stars = 5
        };

        // Act

        Func<Task> act =
            async () => await _service.CreateAsync(request, "user1");

        // Assert

        await act.Should()
            .ThrowAsync<ConflictException>();
    }

    [Fact]
    public async Task UpdateAsync_Should_Update_Rating()
    {
        // Arrange

        var rating = RatingBuilder.Create();

        _ratingRepository
            .Setup(x => x.GetByIdAsync(1))
            .ReturnsAsync(rating);

        var request = new UpdateRatingRequestDto
        {
            Stars = 4,
            Review = "Very Good"
        };

        // Act

        await _service.UpdateAsync(
            1,
            request,
            "user1");

        // Assert

        rating.Stars.Should().Be(4);

        rating.Review.Should().Be("Very Good");

        _ratingRepository.Verify(
            x => x.SaveChangesAsync(),
            Times.Once);
    }

    
}