namespace backend.Models
{
    public class Order : BaseModel
    {
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public ICollection<OrderItem> OrderItems { get; set; } = null!;
    }
}