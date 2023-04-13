using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class OrderBaseDto
    {
        public Guid UserId { get; set; }
    }

    public class OrderReadDto : OrderBaseDto
    {
        public Guid Id { get; set; }
        public ICollection<OrderItemReadDto> OrderItems { get; set; } = null!;
    }

    public class OrderCreateDto : OrderBaseDto { 
        public ICollection<OrderItemCreateDto> OrderItems { get; set; } = null!;
    }

    public class OrderUpdateDto : OrderBaseDto { 
        public ICollection<OrderItemCreateDto> OrderItems { get; set; } = null!;
    }
}