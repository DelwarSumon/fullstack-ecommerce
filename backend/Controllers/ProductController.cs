using backend.Models;
using backend.DTOs;
using backend.Services.ProductService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend.Repositories.BaseRepo;

namespace backend.Controllers
{
    public class ProductController : BaseController<Product, ProductReadDto, ProductCreateDto, ProductUpdateDto>
    {

        private readonly IProductService _productService;

        public ProductController(IProductService service) : base(service)
        {
            _productService = service;
        }

        [AllowAnonymous]
        public override async Task<ActionResult<IEnumerable<ProductReadDto>>> GetAll([FromQuery] QueryOptions options)
        {
            return await base.GetAll(options);
        }

        [AllowAnonymous]
        public override async Task<ActionResult<ProductReadDto?>> GetById([FromRoute] Guid id)
        {
            return await base.GetById(id);
        }

        [Authorize(Policy = "AdminOnly")]
        public override async Task<ActionResult<ProductReadDto?>> CreateOne(ProductCreateDto create)
        {
            return await base.CreateOne(create);
        }

        [Authorize(Policy = "AdminOnly")]
        public override async Task<ActionResult<ProductReadDto>> UpdateOne(Guid id, ProductUpdateDto update)
        {
            return await base.UpdateOne(id, update);
        }

        [Authorize(Policy = "AdminOnly")]
        public override async Task<ActionResult<ProductReadDto>> DeleteOne(Guid id)
        {
            return await base.DeleteOne(id);
        }
    }
}