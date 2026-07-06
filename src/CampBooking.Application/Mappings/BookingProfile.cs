using AutoMapper;
using CampBooking.Application.DTOs.Booking;
using CampBooking.Domain.Entities;

namespace CampBooking.Application.Mappings;

public class BookingProfile : Profile
{
    public BookingProfile()
    {
        CreateMap<CreateBookingRequestDto, Booking>();

        CreateMap<Booking, BookingResponseDto>()
            .ForMember(
                dest => dest.CampName,
                opt => opt.MapFrom(src => src.Camp.Name));

        CreateMap<Booking, BookingListItemDto>()
            .ForMember(
                dest => dest.CampName,
                opt => opt.MapFrom(src => src.Camp.Name));
    }
}