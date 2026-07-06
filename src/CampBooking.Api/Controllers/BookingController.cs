using System.Security.Claims;
using CampBooking.Application.DTOs.Booking;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookingController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateBookingRequestDto request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var booking = await _bookingService.CreateAsync(request, userId);

        return CreatedAtAction(
            nameof(GetMyBookings),
            new { id = booking.Id },
            booking);
    }

    [HttpGet("my-bookings")]
    public async Task<IActionResult> GetMyBookings()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        var bookings =
            await _bookingService.GetUserBookingsAsync(userId);

        return Ok(bookings);
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var bookings =
            await _bookingService.GetAllAsync();

        return Ok(bookings);
    }

    [HttpGet("reference/{bookingReference}")]
    public async Task<IActionResult> GetByReference(
    string bookingReference)
    {
        var userId =
            User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var booking =
            await _bookingService.GetByReferenceAsync(
                bookingReference,
                userId);

        return Ok(booking);
    }

    [HttpPut("{id:int}/cancel")]
    public async Task<IActionResult> Cancel(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userId))
            return Unauthorized();

        await _bookingService.CancelAsync(id, userId);

        return NoContent();
    }
}