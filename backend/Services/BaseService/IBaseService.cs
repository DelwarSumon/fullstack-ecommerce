using backend.Repositories.BaseRepo;

namespace backend.Services.BaseService
{
    public interface IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
    {
        Task<IEnumerable<TReadDto>> GetAllAsync(QueryOptions options);
        Task<TReadDto?> GetByIdAsync(Guid id);
        Task<TReadDto> CreateOneAsync(TCreateDto create);
        Task<TReadDto> UpdateOneAsync(Guid id, TUpdateDto update);
        Task<bool> DeleteOneAsync(Guid id);
    }
}