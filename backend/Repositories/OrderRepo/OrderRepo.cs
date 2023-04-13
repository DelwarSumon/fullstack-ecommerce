using backend.Database;
using backend.Models;
using backend.Repositories.BaseRepo;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.OrderRepo
{
    public class OrderRepo : BaseRepo<Order>, IOrderRepo
    {
        public OrderRepo(DatabaseContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Order>> GetAllAsync(QueryOptions queryOptions)
        {
            var query = _context.Orders.AsQueryable();

            // pagination
            if (queryOptions.Limit > 0)
            {
                query = query.Skip(queryOptions.Skip).Take(queryOptions.Limit);
            }

            return await query.Include(p => p.OrderItems).ToArrayAsync();
        }

        public override async Task<Order?> GetByIdAsync(Guid id)
        {
            return await _context.Orders
                .Include(p => p.OrderItems)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(Guid userId)
        {
            return await _context.Orders
                .Include(p => p.OrderItems)
                .Where(o => o.UserId == userId).ToArrayAsync();
        }
    }
}