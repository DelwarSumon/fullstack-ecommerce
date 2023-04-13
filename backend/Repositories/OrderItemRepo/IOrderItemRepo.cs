using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.BaseRepo;

namespace backend.Repositories.OrderItemRepo
{
    public interface IOrderItemRepo : IBaseRepo<OrderItem>
    {
        Task<IEnumerable<OrderItem>> GetOrderItemsByOrderIdAsync(Guid orderId);
    }
}