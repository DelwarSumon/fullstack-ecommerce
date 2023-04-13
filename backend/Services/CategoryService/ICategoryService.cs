using backend.Services.BaseService;
using backend.Models;
using backend.DTOs;

namespace backend.Services.CategoryService
{
    public interface ICategoryService : IBaseService<Category, CategoryReadDto, CategoryCreateDto, CategoryUpdateDto>
    {

    }
}