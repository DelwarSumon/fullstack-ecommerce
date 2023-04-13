using backend.DTOs;
using backend.Models;
using backend.Services.BaseService;
// using static backend.DTOs.ProductDTO;

namespace backend.Services.ProductService
{
    public interface IProductService : IBaseService<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>
    {
    }
}