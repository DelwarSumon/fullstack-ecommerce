using backend.Models;
using backend.Repositories.BaseRepo;

namespace backend.Repositories.UserRepo
{
    public interface IUserRepo : IBaseRepo<User>
    {
        Task<User?> GetUserByEmail(string email);
        
        // Task<bool> VerifyPassword(User user, string password);
    }
}