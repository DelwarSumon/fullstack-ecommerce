namespace backend.Models
{
    public class FileModel : BaseModel
    {
        public Guid? UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public Guid? CategoryId { get; set; }
        public virtual Category Category { get; set; } = null!;
        public Guid? ProductId { get; set; }
        public virtual Product Product { get; set; } = null!;
        public string Url { get; set; } = null!;
    }
}