using CampBooking.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CampBooking.Infrastructure.Configurations;

public class BookingConfiguration : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.ToTable("Bookings");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.BookingReference)
            .HasMaxLength(20)
            .IsRequired();

        builder.HasIndex(x => x.BookingReference)
            .IsUnique();

        builder.Property(x => x.BillingAddress)
            .HasMaxLength(300)
            .IsRequired();

        builder.Property(x => x.CellPhone)
            .HasMaxLength(15)
            .IsRequired();

        builder.Property(x => x.PricePerNight)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.TotalAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.Status)
            .IsRequired();

        builder.HasOne(b => b.Camp)
       .WithMany(c => c.Bookings)
       .HasForeignKey(b => b.CampId);

        builder.HasOne(b => b.Rating)
               .WithOne(r => r.Booking)
               .HasForeignKey<Rating>(r => r.BookingId);
    }
}