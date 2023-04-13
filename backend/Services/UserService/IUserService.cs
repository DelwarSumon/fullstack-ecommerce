using backend.Services.BaseService;
using backend.DTOs;
using backend.Models;

namespace backend.Services.UserService
{
    public interface IUserService : IBaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        Task<bool> VerifyPassword(User dto, string password);
    }
}