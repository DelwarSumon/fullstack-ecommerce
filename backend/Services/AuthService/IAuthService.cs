using backend.DTOs;

namespace backend.Services.AuthService
{
    public interface IAuthService
    {
        Task<AuthReadDto> LogInAsync(AuthDto auth);
        Task<UserReadDto> ProfileAsync(HttpContext httpContext);
    }
}