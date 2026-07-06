using CampBooking.Application.DTOs.Camp;
using FluentValidation;

namespace CampBooking.Application.Validators.Camp;

public class CreateCampValidator : AbstractValidator<CreateCampRequestDto>
{
    public CreateCampValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(1000);

        RuleFor(x => x.PricePerNight)
            .GreaterThan(0);

        RuleFor(x => x.Capacity)
            .InclusiveBetween(1, 8);

        RuleFor(x => x.ImageUrl)
            .NotEmpty();
    }
}