using backend.Services.BaseService;
using backend.Models;
using backend.DTOs;

namespace backend.Services.OrderService
{
    public interface IOrderService : IBaseService<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>
    {
        Task<IEnumerable<OrderReadDto>> GetOrdersByUserId(Guid userId);
    }
}