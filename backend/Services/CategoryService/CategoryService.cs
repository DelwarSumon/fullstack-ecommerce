using backend.Models;
using backend.DTOs;
using backend.Services.BaseService;
using AutoMapper;
using backend.Repositories.CategoryRepo;

namespace backend.Services.CategoryService
{
    public class CategoryService : BaseService<Category, CategoryReadDto, CategoryCreateDto, CategoryUpdateDto>, ICategoryService
    {
        public CategoryService(IMapper mapper, ICategoryRepo repo) : base(mapper, repo)
        {
        }
    }
}