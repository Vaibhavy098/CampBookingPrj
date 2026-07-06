using CampBooking.Application.DTOs.Camp;
using FluentValidation;

namespace CampBooking.Application.Validators.Camp;

public class CampSearchValidator : AbstractValidator<CampSearchRequestDto>
{
    public CampSearchValidator()
    {
        RuleFor(x => x.PageNumber)
            .GreaterThan(0)
            .WithMessage("Page number must be greater than 0.");

        RuleFor(x => x.PageSize)
            .InclusiveBetween(1, 50)
            .WithMessage("Page size must be between 1 and 50.");

        RuleFor(x => x.CheckOutDate)
            .GreaterThan(x => x.CheckInDate)
            .WithMessage("Check-out date must be after check-in date.");
    }
}