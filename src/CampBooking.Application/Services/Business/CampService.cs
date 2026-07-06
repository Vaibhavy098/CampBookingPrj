using AutoMapper;
using CampBooking.Application.Common;
using CampBooking.Application.DTOs.Camp;
using CampBooking.Application.Exceptions;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Entities;

namespace CampBooking.Application.Services.Business;

public class CampService : ICampService
{
    private readonly ICampRepository _campRepository;
    private readonly IMapper _mapper;

    public CampService(
        ICampRepository campRepository,
        IMapper mapper)
    {
        _campRepository = campRepository;
        _mapper = mapper;
    }

    public async Task<CampResponseDto> CreateAsync(CreateCampRequestDto request)
    {
        var camp = _mapper.Map<Camp>(request);

        camp.IsActive = true;

        await _campRepository.AddAsync(camp);
        await _campRepository.SaveChangesAsync();

        return _mapper.Map<CampResponseDto>(camp);
    }

    public async Task<CampResponseDto> GetByIdAsync(int id)
    {
        var camp = await _campRepository.GetByIdAsync(id);

        if (camp is null)
            throw new NotFoundException("Camp not found.");

        return _mapper.Map<CampResponseDto>(camp);
    }

    public async Task<List<CampListItemDto>> GetAllAsync()
    {
        var camps = await _campRepository.GetAllAsync();

        return _mapper.Map<List<CampListItemDto>>(camps);
    }

    public async Task UpdateAsync(int id, UpdateCampRequestDto request)
    {
        var camp = await _campRepository.GetByIdAsync(id);

        if (camp is null)
            throw new NotFoundException("Camp not found.");

        _mapper.Map(request, camp);

        await _campRepository.UpdateAsync(camp);
        await _campRepository.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var camp = await _campRepository.GetByIdAsync(id);

        if (camp is null || !camp.IsActive)
            throw new NotFoundException("Camp not found.");

        camp.IsActive = false;

        await _campRepository.UpdateAsync(camp);
        await _campRepository.SaveChangesAsync();
    }
    public async Task<PagedResult<CampListItemDto>> SearchAsync(
    CampSearchRequestDto request)
    {
        var result =
            await _campRepository.SearchAvailableAsync(request);

        return new PagedResult<CampListItemDto>
        {
            Items = _mapper.Map<List<CampListItemDto>>(result.Items),

            PageNumber = result.PageNumber,

            PageSize = result.PageSize,

            TotalCount = result.TotalCount
        };
    }
}