using CampBooking.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CampBooking.Infrastructure.Configurations;

public class CampConfiguration : IEntityTypeConfiguration<Camp>
{
    public void Configure(EntityTypeBuilder<Camp> builder)
    {
        builder.ToTable("Camps");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Description)
            .HasMaxLength(500)
            .IsRequired();

        builder.Property(x => x.PricePerNight)
            .HasColumnType("decimal(18,2)");

        builder.Property(x => x.ImageUrl)
            .HasMaxLength(500);

        builder.Property(x => x.Capacity)
            .IsRequired();

        builder.HasMany(c => c.Bookings)
           .WithOne(b => b.Camp)
           .HasForeignKey(b => b.CampId)
           .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(c => c.Ratings)
            .WithOne(r => r.Camp)
            .HasForeignKey(r => r.CampId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}