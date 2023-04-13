using backend.Repositories.BaseRepo;
using AutoMapper;
using backend.Helpers;
using System.Net;

namespace backend.Services.BaseService
{
    public class BaseService<T, TReadDto, TCreateDto, TUpdateDto>
        : IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
    {
        protected readonly IMapper _mapper;
        protected readonly IBaseRepo<T> _repo;

        public BaseService(IMapper mapper, IBaseRepo<T> repo)
        {
            _mapper = mapper;
            _repo = repo;
        }

        public async virtual Task<TReadDto> CreateOneAsync(TCreateDto create)
        {
            var entity = _mapper.Map<TCreateDto, T>(create);
            var result = await _repo.CreateOneAsync(entity);
            if (result is null)
            {
                throw new ServiceException(HttpStatusCode.BadRequest, "The request was invalid.");
            }
            return _mapper.Map<T, TReadDto>(result);
        }

        public async Task<bool> DeleteOneAsync(Guid id)
        {
            return await _repo.DeleteOneAsync(id);
        }

        public async virtual Task<IEnumerable<TReadDto>> GetAllAsync(QueryOptions options)
        {
            var data = await _repo.GetAllAsync(options);
            return _mapper.Map<IEnumerable<T>, IEnumerable<TReadDto>>(data);
        }

        public async Task<TReadDto?> GetByIdAsync(Guid id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity is null)
            {
                throw new ServiceException(HttpStatusCode.NotFound, "Id is not found.");
            }
            return _mapper.Map<T, TReadDto>(entity);
        }

        public async Task<TReadDto> UpdateOneAsync(Guid id, TUpdateDto update)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity is null)
            {
                throw new ServiceException(HttpStatusCode.NotFound, "Id is not found.");
            }
            var result = await _repo.UpdateOneAsync(_mapper.Map<TUpdateDto, T>(update, entity));
            return _mapper.Map<T, TReadDto>(result);
        }
    }
}