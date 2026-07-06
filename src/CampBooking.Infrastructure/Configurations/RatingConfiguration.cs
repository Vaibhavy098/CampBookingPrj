using CampBooking.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CampBooking.Infrastructure.Configurations;

public class RatingConfiguration : IEntityTypeConfiguration<Rating>
{
    public void Configure(EntityTypeBuilder<Rating> builder)
    {
        builder.ToTable("Ratings");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Stars)
            .IsRequired();

        builder.Property(x => x.Review)
            .HasMaxLength(500);

        builder.HasOne(r => r.Camp)
       .WithMany(c => c.Ratings)
       .HasForeignKey(r => r.CampId);

        builder.HasOne(r => r.Booking)
               .WithOne(b => b.Rating)
               .HasForeignKey<Rating>(r => r.BookingId);
        //builder.HasCheckConstraint("CK_Rating_Stars", "Stars >= 1 AND Stars <= 5");
    }
}