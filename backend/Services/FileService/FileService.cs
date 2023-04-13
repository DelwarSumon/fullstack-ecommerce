using backend.Services.BaseService;
using AutoMapper;
using backend.DTOs;
using backend.Models;
using backend.Repositories.FileRepo;

namespace backend.Services.FileService
{
    public class FileService : BaseService<FileModel, FileReadDto, FileCreateDto, FileUpdateDto>,
            IFileService
    {
        public FileService(IMapper mapper, IFileRepo repo) : base(mapper, repo)
        {
        }
    }
}