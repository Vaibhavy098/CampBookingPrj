using CampBooking.Application.DTOs.Rating;
using FluentValidation;

namespace CampBooking.Application.Validators.Rating;

public class UpdateRatingValidator : AbstractValidator<UpdateRatingRequestDto>
{
    public UpdateRatingValidator()
    {
        RuleFor(x => x.Stars)
            .InclusiveBetween(1, 5);

        RuleFor(x => x.Review)
            .MaximumLength(500);
    }
}