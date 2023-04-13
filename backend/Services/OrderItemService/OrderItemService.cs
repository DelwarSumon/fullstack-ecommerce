using AutoMapper;
using backend.DTOs;
using backend.Models;
using backend.Repositories.OrderItemRepo;
using backend.Services.BaseService;

namespace backend.Services.OrderItemService
{
    public class OrderItemService : BaseService<OrderItem, OrderItemReadDto, OrderItemCreateDto, OrderItemUpdateDto>, IOrderItemService
    {
        private new readonly IMapper _mapper;
        private readonly IOrderItemRepo _orderItemRepo;
        public OrderItemService(IMapper mapper, IOrderItemRepo orderItemRepo) : base(mapper, orderItemRepo)
        {
            _orderItemRepo = orderItemRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderItemReadDto>> GetOrderItemsByOrderId(Guid orderId)
        {
            var orderItems = await _orderItemRepo.GetOrderItemsByOrderIdAsync(orderId);
            return _mapper.Map<IEnumerable<OrderItemReadDto>>(orderItems);
        }
    }
}