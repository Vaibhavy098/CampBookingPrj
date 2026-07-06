using CampBooking.Application.Common;
using CampBooking.Application.DTOs.Camp;

namespace CampBooking.Application.Interfaces.Services;

public interface ICampService
{
    Task<CampResponseDto> CreateAsync(CreateCampRequestDto request);

    Task<List<CampListItemDto>> GetAllAsync();

    Task<CampResponseDto> GetByIdAsync(int id);

    Task UpdateAsync(int id, UpdateCampRequestDto request);

    Task DeleteAsync(int id);
    Task<PagedResult<CampListItemDto>> SearchAsync(
        CampSearchRequestDto request);
}