namespace backend.Models;
using System.ComponentModel.DataAnnotations;

public class Product : BaseModel
{
    [MaxLength(256)]
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public double Price { get; set; }
    public int Inventory { get; set; }
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    public ICollection<FileModel> Images { get; set; } = null!;
}