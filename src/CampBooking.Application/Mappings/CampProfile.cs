using AutoMapper;
using CampBooking.Application.DTOs.Camp;
using CampBooking.Domain.Entities;

namespace CampBooking.Application.Mappings;

public class CampProfile : Profile
{
    public CampProfile()
    {
        CreateMap<CreateCampRequestDto, Camp>();

        CreateMap<UpdateCampRequestDto, Camp>();

        CreateMap<Camp, CampResponseDto>();

        CreateMap<Camp, CampListItemDto>()
            .ForMember(
                dest => dest.AverageRating,
                opt => opt.MapFrom(src =>
                    src.Ratings.Any()
                        ? src.Ratings.Average(r => r.Stars)
                        : 0.0));
    }
}