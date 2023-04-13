using backend.DTOs;
using backend.Helpers;
using backend.Models;
using backend.Repositories.AuthRepo;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using backend.Repositories.UserRepo;
using AutoMapper;

namespace backend.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepo _repo;
        private readonly IUserRepo _userRepo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthService(IMapper mapper, IAuthRepo repo, IUserRepo userRepo, IConfiguration config)
        {
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
            _config = config;
        }

        public async Task<AuthReadDto> LogInAsync(AuthDto auth)
        {
            var user = await _repo.LogInAsync(auth);
            if (user is null)
            {
                throw ServiceException.Unauthorized("Credentials are wrong.");
            }

            var matchedPassword = await ServiceHash.CompareHashData(auth.Password, user.Password, user.Salt);
            if (!matchedPassword)
            {
                throw ServiceException.Unauthorized("Credentials are wrong.");
            }
            return CreateToken(user);
        }

        public async Task<UserReadDto> ProfileAsync(HttpContext httpContext)
        {
            // var userId = httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier), out Guid userId))
            {
                throw ServiceException.BadRequest("Invalid user ID");
            }
            var user = await _userRepo.GetByIdAsync(userId);
            if (user is null)
            {
                throw ServiceException.NotFound("Profile is not found");
            }
            // return user;
            return _mapper.Map<User, UserReadDto>(user);
        }

        private AuthReadDto CreateToken(User user)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var secret = _config["AppSettings:Token"] ?? "";
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.Now.AddDays(7);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = credentials,
                Expires = expiration
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            // return tokenHandler.WriteToken(token);
            return new AuthReadDto
            {
                Token = tokenHandler.WriteToken(token),
                Expiration = expiration
            };
        }
    }
}