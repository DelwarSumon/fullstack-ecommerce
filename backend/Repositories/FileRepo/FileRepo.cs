using backend.Repositories.BaseRepo;
using backend.Database;
using backend.Models;

namespace backend.Repositories.FileRepo
{
    public class FileRepo : BaseRepo<FileModel>, IFileRepo
    {
        protected new readonly DatabaseContext _context;
        public FileRepo(DatabaseContext context) : base(context)
        {
            _context = context;
        }
    }
}