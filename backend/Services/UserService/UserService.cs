using backend.Services.BaseService;
using backend.Models;
using backend.DTOs;
using AutoMapper;
using backend.Repositories.UserRepo;
using backend.Helpers;

namespace backend.Services.UserService
{
    public class UserService : BaseService<User, UserReadDto, UserCreateDto, UserUpdateDto>, IUserService
    {
        private readonly IMapper _mapperService;
        private readonly IUserRepo _userRepo;
        public UserService(IMapper mapper, IUserRepo repo) : base(mapper, repo)
        {
            _mapperService = mapper;
            _userRepo = repo;
        }

        public override async Task<UserReadDto> CreateOneAsync(UserCreateDto dto)
        {
            ServiceHash.CreateHashData(dto.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var entity = _mapperService.Map<UserCreateDto, User>(dto);
            entity.Password = passwordHash;
            entity.Salt = passwordSalt;
            var result = await _userRepo.CreateOneAsync(entity);
            if (result is null)
            {
                throw ServiceException.BadRequest("Data is not valid.");
            }
            return _mapperService.Map<User, UserReadDto>(entity);
        }

        public async Task<bool> VerifyPassword(User dto, string password)
        {
            return await ServiceHash.CompareHashData(password, dto.Password, dto.Salt);
        }

    }
}