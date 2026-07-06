using CampBooking.Application.DTOs.Auth;
using CampBooking.Application.Exceptions;
using CampBooking.Application.Interfaces.Authentication;
using CampBooking.Domain.Constants;
using CampBooking.Infrastructure.Authentication;
using CampBooking.Infrastructure.Identity;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace CampBooking.Tests.AuthTests;

public class AuthServiceTests
{
    private readonly Mock<UserManager<ApplicationUser>> _userManager;
    private readonly Mock<RoleManager<IdentityRole>> _roleManager;
    private readonly Mock<IJwtTokenGenerator> _jwtGenerator;

    private readonly AuthService _service;

    public AuthServiceTests()
    {
        var userStore =
            new Mock<IUserStore<ApplicationUser>>();

        _userManager =
            new Mock<UserManager<ApplicationUser>>(
                userStore.Object,
                null!,
                null!,
                null!,
                null!,
                null!,
                null!,
                null!,
                null!);

        var roleStore =
            new Mock<IRoleStore<IdentityRole>>();

        _roleManager =
            new Mock<RoleManager<IdentityRole>>(
                roleStore.Object,
                null!,
                null!,
                null!,
                null!);

        _jwtGenerator =
            new Mock<IJwtTokenGenerator>();

        _service =
            new AuthService(
                _userManager.Object,
                _roleManager.Object,
                _jwtGenerator.Object);
    }

    [Fact]
    public async Task RegisterAsync_Should_Register_User()
    {
        var request = new RegisterRequestDto
        {
            FullName = "Vaibhav",
            Email = "vaibhav@test.com",
            Password = "Password@123"
        };

        _userManager
            .Setup(x => x.FindByEmailAsync(request.Email))
            .ReturnsAsync((ApplicationUser?)null);

        _userManager
            .Setup(x => x.CreateAsync(
                It.IsAny<ApplicationUser>(),
                request.Password))
            .ReturnsAsync(IdentityResult.Success);

        _userManager
            .Setup(x => x.AddToRoleAsync(
                It.IsAny<ApplicationUser>(),
                Roles.User))
            .ReturnsAsync(IdentityResult.Success);

        var result =
            await _service.RegisterAsync(request);

        result.Success.Should().BeTrue();

        _userManager.Verify(
            x => x.CreateAsync(
                It.IsAny<ApplicationUser>(),
                request.Password),
            Times.Once);
    }

    

    [Fact]
    public async Task LoginAsync_Should_Return_Token()
    {
        var user = new ApplicationUser
        {
            Id = "1",
            Email = "abc@test.com"
        };

        var request = new LoginRequestDto
        {
            Email = user.Email,
            Password = "Password@123"
        };

        _userManager
            .Setup(x => x.FindByEmailAsync(user.Email))
            .ReturnsAsync(user);

        _userManager
            .Setup(x => x.CheckPasswordAsync(
                user,
                request.Password))
            .ReturnsAsync(true);

        _userManager
            .Setup(x => x.GetRolesAsync(user))
            .ReturnsAsync(new List<string>
            {
                Roles.User
            });

        _jwtGenerator
            .Setup(x => x.GenerateTokenAsync(
                user.Id,
                user.Email!,
                It.IsAny<IList<string>>()))
            .ReturnsAsync("JWT_TOKEN");

        var result =
            await _service.LoginAsync(request);

        result.Token.Should().Be("JWT_TOKEN");
    }

    
}
