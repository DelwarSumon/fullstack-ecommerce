using backend.Models;
using backend.DTOs;
using backend.Services.FileService;

namespace backend.Controllers
{
    public class FileController : BaseController<FileModel, FileReadDto, FileCreateDto, FileUpdateDto>
    {
        public FileController(IFileService service) : base(service)
        {
        }
    }
}