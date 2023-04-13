using backend.DTOs;
using backend.Models;
using backend.Repositories.BaseRepo;
using backend.Services.CategoryService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/v1/categories")]
    public class CategoryController : BaseController<Category, CategoryReadDto, CategoryCreateDto, CategoryUpdateDto>
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService service) : base(service)
        {
            _categoryService = service;
        }

        [AllowAnonymous]
        public override async Task<ActionResult<IEnumerable<CategoryReadDto>>> GetAll([FromQuery] QueryOptions options)
        {
            return await base.GetAll(options);
        }

        [AllowAnonymous]
        public override async Task<ActionResult<CategoryReadDto?>> GetById([FromRoute] Guid id)
        {
            return await base.GetById(id);
        }

        [Authorize(Policy = "AdminOnly")]
        public override async Task<ActionResult<CategoryReadDto?>> CreateOne(CategoryCreateDto create)
        {
            return await base.CreateOne(create);
        }

        [Authorize(Policy = "AdminOnly")]
        public override async Task<ActionResult<CategoryReadDto>> UpdateOne(Guid id, CategoryUpdateDto update)
        {
            return await base.UpdateOne(id, update);
        }

        [Authorize(Policy = "AdminOnly")]
        public override async Task<ActionResult<CategoryReadDto>> DeleteOne(Guid id)
        {
            return await base.DeleteOne(id);
        }
    }
}