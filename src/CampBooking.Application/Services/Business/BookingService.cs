using AutoMapper;
using CampBooking.Application.DTOs.Booking;
using CampBooking.Application.Exceptions;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;

namespace CampBooking.Application.Services.Business;

public class BookingService : IBookingService
{
    private readonly IBookingRepository _bookingRepository;
    private readonly ICampRepository _campRepository;
    private readonly IMapper _mapper;

    public BookingService(
        IBookingRepository bookingRepository,
        ICampRepository campRepository,
        IMapper mapper)
    {
        _bookingRepository = bookingRepository;
        _campRepository = campRepository;
        _mapper = mapper;
    }

    public async Task<BookingResponseDto> CreateAsync(
        CreateBookingRequestDto request,
        string userId)
    {
        var camp = await _campRepository.GetCampForBookingAsync(request.CampId);

        if (camp is null)
            throw new NotFoundException("Camp not found.");

        var hasOverlap =
            await _bookingRepository.HasOverlappingBookingAsync(
                request.CampId,
                request.CheckInDate,
                request.CheckOutDate);

        if (hasOverlap)
            throw new ConflictException(
                "Camp is already booked for the selected dates.");

        var numberOfNights =
            (request.CheckOutDate.Date - request.CheckInDate.Date).Days;

        if (numberOfNights <= 0)
            throw new ValidationException("Invalid booking duration.");

        var totalAmount =
            numberOfNights * camp.PricePerNight;

        var booking = new Booking
        {
            CampId = camp.Id,
            UserId = userId,

            CheckInDate = request.CheckInDate,
            CheckOutDate = request.CheckOutDate,

            BillingAddress = request.BillingAddress,
            CellPhone = request.CellPhone,

            PricePerNight = camp.PricePerNight,
            TotalAmount = totalAmount,

            BookingReference = GenerateBookingReference(),

            Status = BookingStatus.Pending
        };

        await _bookingRepository.AddAsync(booking);
        await _bookingRepository.SaveChangesAsync();

        booking.Camp = camp;

        return _mapper.Map<BookingResponseDto>(booking);
    }

    public async Task<List<BookingListItemDto>> GetUserBookingsAsync(
        string userId)
    {
        var bookings =
            await _bookingRepository.GetUserBookingsAsync(userId);

        await UpdateCompletedBookingsAsync(bookings);

        return _mapper.Map<List<BookingListItemDto>>(bookings);
    }

    public async Task<List<BookingListItemDto>> GetAllAsync()
    {
        var bookings =
            await _bookingRepository.GetAllAsync();

        await UpdateCompletedBookingsAsync(bookings);

        return _mapper.Map<List<BookingListItemDto>>(bookings);
    }
    public async Task<BookingResponseDto> GetByReferenceAsync(
    string bookingReference,
    string userId)
    {
        var booking =
            await _bookingRepository.GetByReferenceAsync(bookingReference);

        if (booking is null)
            throw new NotFoundException("Booking not found.");

        if (booking.UserId != userId)
            throw new ForbiddenException(
                "You are not allowed to access this booking.");

        if ((booking.Status == BookingStatus.Pending ||
             booking.Status == BookingStatus.Confirmed) &&
            booking.CheckOutDate.Date < DateTime.UtcNow.Date)
        {
            booking.Status = BookingStatus.Completed;
            await _bookingRepository.SaveChangesAsync();
        }

        return _mapper.Map<BookingResponseDto>(booking);
    }

    public async Task CancelAsync(
        int bookingId,
        string userId)
    {
        var booking =
            await _bookingRepository.GetByIdAsync(bookingId);

        if (booking is null)
            throw new NotFoundException("Booking not found.");

        if (booking.UserId != userId)
            throw new ForbiddenException(
                "You are not allowed to cancel this booking.");

        if (booking.Status == BookingStatus.Cancelled)
            throw new ConflictException(
                "Booking is already cancelled.");

        if (booking.CheckInDate.Date <= DateTime.UtcNow.Date)
        {
            throw new ConflictException(
                "Only future bookings can be cancelled.");
        }

        booking.Status = BookingStatus.Cancelled;

        await _bookingRepository.UpdateAsync(booking);

        await _bookingRepository.SaveChangesAsync();
    }

    private static string GenerateBookingReference()
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        return new string(
            Enumerable.Range(0, 8)
                .Select(_ => chars[Random.Shared.Next(chars.Length)])
                .ToArray());
    }

    private async Task UpdateCompletedBookingsAsync(IEnumerable<Booking> bookings)
    {
        var today = DateTime.UtcNow.Date;
        var hasChanges = false;

        foreach (var booking in bookings)
        {
            if ((booking.Status == BookingStatus.Pending ||
                 booking.Status == BookingStatus.Confirmed) &&
                booking.CheckOutDate.Date < today)
            {
                booking.Status = BookingStatus.Completed;
                hasChanges = true;
            }
        }

        if (hasChanges)
        {
            await _bookingRepository.SaveChangesAsync();
        }
    }
}