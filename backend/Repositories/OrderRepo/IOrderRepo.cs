using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.BaseRepo;

namespace backend.Repositories.OrderRepo
{
    public interface IOrderRepo : IBaseRepo<Order>
    {
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(Guid userId);
    }
}