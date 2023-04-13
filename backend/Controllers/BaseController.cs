using System.Net.Mime;
using backend.Repositories.BaseRepo;
using backend.Services.BaseService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Produces(MediaTypeNames.Application.Json)]
    // [Consumes(MediaTypeNames.Application.Json)]
    [Authorize]
    [Route("api/v1/[controller]s")]
    public class BaseController<T, TReadDto, TCreateDto, TUpdateDto> : ControllerBase
    {
        protected readonly IBaseService<T, TReadDto, TCreateDto, TUpdateDto> _service;

        public BaseController(IBaseService<T, TReadDto, TCreateDto, TUpdateDto> service)
        {
            _service = service;
        }

        [HttpGet]
        public async virtual Task<ActionResult<IEnumerable<TReadDto>>> GetAll([FromQuery] QueryOptions options)
        {
            return Ok(await _service.GetAllAsync(options));
        }

        [HttpGet("{id}")]
        public async virtual Task<ActionResult<TReadDto?>> GetById([FromRoute] Guid id)
        {
            return Ok(await _service.GetByIdAsync(id));
        }

        [HttpPost]
        public async virtual Task<ActionResult<TReadDto?>> CreateOne(TCreateDto create)
        {
            var result = await _service.CreateOneAsync(create);
            // return CreatedAtAction(nameof(CreateOne), result);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async virtual Task<ActionResult<TReadDto>> UpdateOne(Guid id, TUpdateDto update)
        {
            return Ok(await _service.UpdateOneAsync(id, update));
        }

        [HttpDelete("{id}")]
        public async virtual Task<ActionResult<TReadDto>> DeleteOne(Guid id)
        {
            return Ok(await _service.DeleteOneAsync(id));
        }
    }
}