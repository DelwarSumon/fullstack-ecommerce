using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Database;
using backend.Models;
using backend.Repositories.BaseRepo;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.OrderItemRepo
{
    public class OrderItemRepo : BaseRepo<OrderItem>, IOrderItemRepo
    {
        public OrderItemRepo(DatabaseContext context) : base(context)
        {
        }

        public async Task<IEnumerable<OrderItem>> GetOrderItemsByOrderIdAsync(Guid orderId)
        {
            return await _context.OrderItems.Where(oi => oi.OrderId == orderId).ToArrayAsync();
        }
    }
}