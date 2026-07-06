using CampBooking.Application.DTOs.Camp;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampBooking.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CampController : ControllerBase
{
    private readonly ICampService _campService;

    public CampController(ICampService campService)
    {
        _campService = campService;
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromBody] CreateCampRequestDto request)
    {
        var response = await _campService.CreateAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = response.Id },
            response);
    }

    [AllowAnonymous]
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var camp = await _campService.GetByIdAsync(id);

        return Ok(camp);
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var camps = await _campService.GetAllAsync();

        return Ok(camps);
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        [FromBody] UpdateCampRequestDto request)
    {
        await _campService.UpdateAsync(id, request);

        return NoContent();
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _campService.DeleteAsync(id);

        return NoContent();
    }
    [AllowAnonymous]
    [HttpGet("search")]
    public async Task<IActionResult> Search(
    [FromQuery] CampSearchRequestDto request)
    {
        var result =
            await _campService.SearchAsync(request);

        return Ok(result);
    }
}