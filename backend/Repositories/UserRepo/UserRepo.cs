using backend.Database;
using backend.Models;
using backend.Repositories.BaseRepo;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.UserRepo
{
    public class UserRepo : BaseRepo<User>, IUserRepo
    {
        public UserRepo(DatabaseContext context) : base(context)
        {
        }

        public override async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users
                .Include(p => p.Image)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users.Include(p => p.Image).FirstOrDefaultAsync(u => u.Email == email);
        }

        // public async Task<bool> VerifyPassword(User user, string password)
        // {
        //     byte[] hashedPassword = user.Password;
        //     byte[] salt = user.Salt;

        //     byte[] computedHash = await _passwordService.HashPassword(password, salt);

        //     return hashedPassword.SequenceEqual(computedHash);
        // }
    }
}