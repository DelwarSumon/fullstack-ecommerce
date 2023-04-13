using backend.DTOs;
using backend.Models;

namespace backend.Repositories.AuthRepo
{
    public interface IAuthRepo
    {
        Task<User?> LogInAsync(AuthDto auth);
    }
}