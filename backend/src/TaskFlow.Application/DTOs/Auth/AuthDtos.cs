namespace TaskFlow.Application.DTOs.Auth;

public record LoginDto(string Email, string Password);
public record RegisterDto(string Email, string Password, string DisplayName);
public record AuthResponseDto(string Token, string Email, string DisplayName);
