using backend.DTOs;
using backend.Services.AuthService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        public readonly IAuthService _service;

        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<AuthReadDto> LogInAsync([FromBody] AuthDto auth)
        {
            return await _service.LogInAsync(auth);
        }

        [HttpGet("profile")]
        public async Task<UserReadDto> Profile()
        {
            return await _service.ProfileAsync(HttpContext);
        }

    }
}