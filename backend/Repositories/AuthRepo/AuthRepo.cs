using backend.Database;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.AuthRepo
{
    public class AuthRepo : IAuthRepo
    {
        private readonly DatabaseContext _context;

        public AuthRepo(DatabaseContext context)
        {
            _context = context;
        }
        public async Task<User?> LogInAsync(AuthDto auth)
        {
            var user = await _context.Set<User>().FirstOrDefaultAsync(u => u.Email.Equals(auth.Email));
            return user;
        }
    }
}