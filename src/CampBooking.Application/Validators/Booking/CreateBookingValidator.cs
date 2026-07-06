using CampBooking.Application.DTOs.Booking;
using FluentValidation;

namespace CampBooking.Application.Validators.Booking;

public class CreateBookingValidator
    : AbstractValidator<CreateBookingRequestDto>
{
    public CreateBookingValidator()
    {
        RuleFor(x => x.CampId)
            .GreaterThan(0)
            .WithMessage("CampId is required and must be greater than 0.");

        RuleFor(x => x.CheckInDate)
            .GreaterThan(DateTime.Today)
            .WithMessage("Check-in date must be in the future.");

        RuleFor(x => x.CheckOutDate)
            .GreaterThan(x => x.CheckInDate)
            .WithMessage("Check-out date must be after the check-in date.");

        RuleFor(x => x.BillingAddress)
            .NotEmpty()
            .MaximumLength(500)
            .WithMessage("Billing address is required and cannot exceed 500 characters.");

        RuleFor(x => x.CellPhone)
            .NotEmpty()
            .Matches(@"^[0-9]{10}$")
            .WithMessage("Phone number must contain exactly 10 digits.");
    }
}