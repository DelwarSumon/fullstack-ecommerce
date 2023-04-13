using Microsoft.AspNetCore.Authorization;
using backend.Models;
using backend.DTOs;
using backend.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using backend.Repositories.BaseRepo;

namespace backend.Controllers
{

    public class UserController : BaseController<User, UserReadDto, UserCreateDto, UserUpdateDto>
    {
        public readonly IAuthorizationService _authorizationService;
        public UserController(IUserService service, IAuthorizationService authorizationService) : base(service)
        {
            _authorizationService = authorizationService;
        }

        [Authorize(Policy = "AdminOnly")]
        public override async Task<ActionResult<IEnumerable<UserReadDto>>> GetAll([FromQuery] QueryOptions options)
        {
            return await base.GetAll(options);
        }

        public override async Task<ActionResult<UserReadDto?>> GetById([FromRoute] Guid id)
        {
            var authorization = await _authorizationService.AuthorizeAsync(HttpContext.User, id, "AdminOrOwner"); //resource-based
            if (authorization.Succeeded)
            {
                return await base.GetById(id);
            }
            else
            {
                return Forbid();
            }
        }

        [AllowAnonymous]
        public override async Task<ActionResult<UserReadDto?>> CreateOne(UserCreateDto create)
        {
            return await base.CreateOne(create);
        }

        public override async Task<ActionResult<UserReadDto>> UpdateOne(Guid id, UserUpdateDto update)
        {
            var authorization = await _authorizationService.AuthorizeAsync(HttpContext.User, id, "AdminOrOwner");
            if (authorization.Succeeded)
            {
                return await base.UpdateOne(id, update);
            }
            else
            {
                return Forbid();
            }
        }

        [Authorize(Policy = "AdminOnly")]
        public override async Task<ActionResult<UserReadDto>> DeleteOne(Guid id)
        {
            return await base.DeleteOne(id);
        }
    }
}