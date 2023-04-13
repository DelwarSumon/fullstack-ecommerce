using backend.DTOs;
using backend.Models;
using backend.Repositories.ProductRepo;
using backend.Services.BaseService;
using AutoMapper;

namespace backend.Services.ProductService
{
    public class ProductService
        : BaseService<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>,
            IProductService
    {
        public ProductService(IMapper mapper, IProductRepo repo) : base(mapper, repo)
        {
        }

        // public override async Task<IEnumerable<ProductReadDto>> GetAllAsync(QueryOptions options)
        // {
        //     var data = await _repo.GetAllAsync(options);
        //     return _mapper.Map<IEnumerable<Product>, IEnumerable<ProductReadDto>>(data);
        // }
    }
}