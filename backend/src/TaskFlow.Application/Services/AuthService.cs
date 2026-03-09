using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using TaskFlow.Application.DTOs.Auth;
using TaskFlow.Domain.Entities;
using TaskFlow.Infrastructure.Data;

namespace TaskFlow.Application.Services;

public class AuthService(AppDbContext db, IConfiguration config)
{
    public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
    {
        if (await db.Users.AnyAsync(u => u.Email == dto.Email))
            throw new InvalidOperationException("Email already in use");

        var user = new User
        {
            Email = dto.Email,
            DisplayName = dto.DisplayName,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();
        return new AuthResponseDto(GenerateToken(user), user.Email, user.DisplayName);
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email)
            ?? throw new UnauthorizedAccessException("Invalid credentials");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials");

        return new AuthResponseDto(GenerateToken(user), user.Email, user.DisplayName);
    }

    private string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtSettings:Secret"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
        };
        var token = new JwtSecurityToken(
            issuer: config["JwtSettings:Issuer"],
            audience: config["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
