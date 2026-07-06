using AutoMapper;
using CampBooking.Application.DTOs.Booking;
using CampBooking.Application.Exceptions;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Services.Business;
using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;
using CampBooking.Tests.Builders;
using CampBooking.Tests.Helpers;
using FluentAssertions;
using Moq;

namespace CampBooking.Tests.BookingTests;

public class BookingServiceTests
{
    private readonly Mock<IBookingRepository> _bookingRepository;
    private readonly Mock<ICampRepository> _campRepository;

    private readonly BookingService _service;

    private readonly IMapper _mapper;

    public BookingServiceTests()
    {
        _bookingRepository = new Mock<IBookingRepository>();

        _campRepository = new Mock<ICampRepository>();

        _mapper = MappingProfileFactory.CreateMapper();

        _service = new BookingService(
            _bookingRepository.Object,
            _campRepository.Object,
            _mapper);
    }

    [Fact]
    public async Task CreateAsync_Should_Create_Booking()
    {
        // Arrange

        var camp = CampBuilder.Create();

        var request = new CreateBookingRequestDto
        {
            CampId = 1,
            CheckInDate = DateTime.UtcNow.AddDays(5),
            CheckOutDate = DateTime.UtcNow.AddDays(7),
            BillingAddress = "Delhi",
            CellPhone = "9999999999"
        };

        _campRepository
            .Setup(x => x.GetCampForBookingAsync(1))
            .ReturnsAsync(camp);

        _bookingRepository
            .Setup(x => x.HasOverlappingBookingAsync(
                It.IsAny<int>(),
                It.IsAny<DateTime>(),
                It.IsAny<DateTime>()))
            .ReturnsAsync(false);

        // Act

        var result = await _service.CreateAsync(request, "user1");

        // Assert

        result.Should().NotBeNull();

        result.TotalAmount.Should().Be(3000);

        result.BookingReference.Should().HaveLength(8);

        _bookingRepository.Verify(
            x => x.AddAsync(It.IsAny<Booking>()),
            Times.Once);

        _bookingRepository.Verify(
            x => x.SaveChangesAsync(),
            Times.Once);
    }

    
    [Fact]
    public async Task CreateAsync_Should_Throw_When_Booking_Overlaps()
    {
        // Arrange

        var camp = CampBuilder.Create();

        var request = new CreateBookingRequestDto
        {
            CampId = 1,
            CheckInDate = DateTime.UtcNow.AddDays(5),
            CheckOutDate = DateTime.UtcNow.AddDays(7),
            BillingAddress = "Delhi",
            CellPhone = "9999999999"
        };

        _campRepository
            .Setup(x => x.GetCampForBookingAsync(1))
            .ReturnsAsync(camp);

        _bookingRepository
            .Setup(x => x.HasOverlappingBookingAsync(
                It.IsAny<int>(),
                It.IsAny<DateTime>(),
                It.IsAny<DateTime>()))
            .ReturnsAsync(true);

        // Act

        Func<Task> act =
            async () => await _service.CreateAsync(request, "user1");

        // Assert

        await act.Should()
            .ThrowAsync<ConflictException>();
    }

    [Fact]
    public async Task CancelAsync_Should_Cancel_Future_Booking()
    {
        // Arrange

        var booking = BookingBuilder.Create();

        booking.Status = BookingStatus.Pending;

        booking.CheckInDate = DateTime.UtcNow.AddDays(10);

        _bookingRepository
            .Setup(x => x.GetByIdAsync(1))
            .ReturnsAsync(booking);

        // Act

        await _service.CancelAsync(1, "user1");

        // Assert

        booking.Status.Should().Be(BookingStatus.Cancelled);

        _bookingRepository.Verify(
            x => x.UpdateAsync(booking),
            Times.Once);

        _bookingRepository.Verify(
            x => x.SaveChangesAsync(),
            Times.Once);
    }

    [Fact]
    public async Task CancelAsync_Should_Throw_When_Booking_Is_In_Past()
    {
        // Arrange

        var booking = BookingBuilder.Create();

        booking.CheckInDate = DateTime.UtcNow.AddDays(-2);

        booking.CheckOutDate = DateTime.UtcNow.AddDays(1);

        _bookingRepository
            .Setup(x => x.GetByIdAsync(1))
            .ReturnsAsync(booking);

        // Act

        Func<Task> act =
            async () => await _service.CancelAsync(1, "user1");

        // Assert

        await act.Should()
            .ThrowAsync<ConflictException>();
    }

    
}