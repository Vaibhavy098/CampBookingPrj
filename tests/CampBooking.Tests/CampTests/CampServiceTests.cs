using AutoMapper;
using CampBooking.Application.DTOs.Camp;
using CampBooking.Application.Exceptions;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Services.Business;
using CampBooking.Tests.Builders;
using CampBooking.Tests.Helpers;
using FluentAssertions;
using Moq;

namespace CampBooking.Tests.CampTests;

public class CampServiceTests
{
    private readonly Mock<ICampRepository> _repository;
    private readonly CampService _service;
    private readonly IMapper _mapper;

    public CampServiceTests()
    {
        _repository = new Mock<ICampRepository>();

        _mapper = MappingProfileFactory.CreateMapper();

        _service = new CampService(
            _repository.Object,
            _mapper);
    }


    [Fact]
    public async Task CreateAsync_Should_Create_Camp()
    {
        // Arrange

        var request = new CreateCampRequestDto
        {
            Name = "River Camp",
            Description = "Beautiful",
            Capacity = 3,
            PricePerNight = 1200,
            ImageUrl = "river.jpg"
        };

        // Act

        var result =
            await _service.CreateAsync(request);

        // Assert

        result.Should().NotBeNull();

        result.Name.Should().Be(request.Name);

        _repository.Verify(
            x => x.AddAsync(It.IsAny<Domain.Entities.Camp>()),
            Times.Once);

        _repository.Verify(
            x => x.SaveChangesAsync(),
            Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_Should_Soft_Delete_Camp()
    {
        // Arrange

        var camp = CampBuilder.Create();

        _repository
            .Setup(x => x.GetByIdAsync(1))
            .ReturnsAsync(camp);

        // Act

        await _service.DeleteAsync(1);

        // Assert

        camp.IsActive.Should().BeFalse();

        _repository.Verify(
            x => x.UpdateAsync(camp),
            Times.Once);

        _repository.Verify(
            x => x.SaveChangesAsync(),
            Times.Once);
    }

}