using CampBooking.Application.DTOs.Rating;
using FluentValidation;

namespace CampBooking.Application.Validators.Rating;

public class CreateRatingValidator
    : AbstractValidator<CreateRatingRequestDto>
{
    public CreateRatingValidator()
    {
        RuleFor(x => x.BookingId)
            .GreaterThan(0);

        RuleFor(x => x.Stars)
            .InclusiveBetween(1, 5);

        RuleFor(x => x.Review)
            .MaximumLength(500);
    }
}