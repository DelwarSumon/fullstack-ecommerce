using backend.DTOs;
using backend.Models;
using backend.Services.BaseService;

namespace backend.Services.OrderItemService
{
    public interface IOrderItemService : IBaseService<OrderItem, OrderItemReadDto, OrderItemCreateDto, OrderItemUpdateDto>
    {
        Task<IEnumerable<OrderItemReadDto>> GetOrderItemsByOrderId(Guid orderId);
    }
}