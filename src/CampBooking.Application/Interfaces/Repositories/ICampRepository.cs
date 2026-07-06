using CampBooking.Application.Common;
using CampBooking.Application.DTOs.Camp;
using CampBooking.Domain.Entities;

namespace CampBooking.Application.Interfaces.Repositories;

public interface ICampRepository
{
    Task AddAsync(Camp camp);

    Task UpdateAsync(Camp camp);

    Task<Camp?> GetByIdAsync(int id);
    Task<Camp?> GetCampForBookingAsync(int campId);

    Task<List<Camp>> GetAllAsync();
    Task<bool> ExistsAsync(int id);
    Task<PagedResult<Camp>> SearchAvailableAsync(
    CampSearchRequestDto request);
    Task SaveChangesAsync();
}