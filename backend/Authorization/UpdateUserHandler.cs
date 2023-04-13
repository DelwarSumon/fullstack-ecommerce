using System.Security.Claims;
using backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Authorization
{
    public class UpdateUserRequirement : IAuthorizationRequirement { }

    public class UpdateUserHandler : AuthorizationHandler<UpdateUserRequirement, Guid>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, UpdateUserRequirement requirement, Guid resource)
        {
            var userRole = context.User.FindFirstValue(ClaimTypes.Role);
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userRole == Role.Admin.ToString())
            {
                context.Succeed(requirement);
            }
            else if (userId == resource.ToString())
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}