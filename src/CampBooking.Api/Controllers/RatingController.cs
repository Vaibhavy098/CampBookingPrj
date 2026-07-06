using System.Security.Claims;
using CampBooking.Application.DTOs.Rating;
using CampBooking.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RatingController : ControllerBase
{
    private readonly IRatingService _ratingService;

    public RatingController(IRatingService ratingService)
    {
        _ratingService = ratingService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(
        CreateRatingRequestDto request)
    {
        var userId =
            User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        var response =
            await _ratingService.CreateAsync(
                request,
                userId);

        return Ok(response);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateRatingRequestDto request)
    {
        var userId =
            User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        await _ratingService.UpdateAsync(
            id,
            request,
            userId);

        return NoContent();
    }
}