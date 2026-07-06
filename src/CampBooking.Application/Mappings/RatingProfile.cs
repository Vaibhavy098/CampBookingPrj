using AutoMapper;
using CampBooking.Application.DTOs.Rating;
using CampBooking.Domain.Entities;

namespace CampBooking.Application.Mappings;

public class RatingProfile : Profile
{
    public RatingProfile()
    {
        CreateMap<Rating, RatingResponseDto>()
            .ForMember(
                dest => dest.CampName,
                opt => opt.MapFrom(src => src.Camp.Name));

        CreateMap<Rating, RatingListItemDto>()
            .ForMember(
                dest => dest.CampName,
                opt => opt.MapFrom(src => src.Camp.Name));
    }
}