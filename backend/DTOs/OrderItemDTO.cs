namespace backend.DTOs
{
    public class OrderItemBaseDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }

    public class OrderItemReadDto : OrderItemBaseDto
    {
        public Guid Id { get; set; }
    }

    public class OrderItemCreateDto : OrderItemBaseDto { }

    public class OrderItemUpdateDto : OrderItemBaseDto { }
}