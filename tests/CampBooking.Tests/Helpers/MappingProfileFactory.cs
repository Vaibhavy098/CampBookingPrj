using AutoMapper;
using CampBooking.Application.Mappings;

namespace CampBooking.Tests.Helpers;

public static class MappingProfileFactory
{
    public static IMapper CreateMapper()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<CampProfile>();
            cfg.AddProfile<BookingProfile>();
            cfg.AddProfile<RatingProfile>();
        });

        //configuration.AssertConfigurationIsValid();

        return configuration.CreateMapper();
    }
}