using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Category : BaseModel
    {
        [MaxLength(256)]
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public ICollection<Product> Products { get; set; } = null!;
        public FileModel Image { get; set; } = null!;
    }
}