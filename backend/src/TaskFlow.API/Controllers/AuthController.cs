using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.DTOs.Auth;
using TaskFlow.Application.Services;

namespace TaskFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService authService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var result = await authService.RegisterAsync(dto);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var result = await authService.LoginAsync(dto);
        return Ok(result);
    }
}
