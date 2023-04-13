using backend.Services.BaseService;
using backend.DTOs;
using backend.Models;

namespace backend.Services.FileService
{
    public interface IFileService : IBaseService<FileModel, FileReadDto, FileCreateDto, FileUpdateDto>
    {

    }
}